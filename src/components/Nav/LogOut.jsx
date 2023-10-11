import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import { LogOutIcon } from "../../icons/LogOutIcon";

export const LogOut = () => {
  const { logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
  };

  return (
    <Button bg="primary" onClick={handleLogOut}>
      <LogOutIcon />
    </Button>
  );
};
