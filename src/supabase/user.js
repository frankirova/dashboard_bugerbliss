import { supabase } from "./config";
export const user = {
  google: async () => {
    try {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        console.error("Error al iniciar sesión con Google:", error.message);
      } else {
        // El usuario ha iniciado sesión con éxito
        console.log("Usuario:", user);
        console.log("Token de sesión:", data);

        // Redireccionar al usuario a la página de inicio
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error inesperado:", error.message);
    }
  },
};
