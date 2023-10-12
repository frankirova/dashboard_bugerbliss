import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (e, session) => {
        if (session === null) {
          navigate("/", { replace: true });
        } else {
          setUser(session?.user);
          navigate("/", { replace: true });
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);

  const signInWhitGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        throw new Error("Error durante el inicio de sesion");
      }
      return data;
    } catch (error) {
      console.error("Hubo un error:" + error);
    }
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error("Error durante el inicio de sesion");
    }
    location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWhitGoogle();
  };
  return (
    <AuthContext.Provider
      value={{ user, logOut, signInWhitGoogle, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
