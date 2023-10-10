import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { authContext } from "../../context";

import { Button } from "@chakra-ui/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const LogOut = () => {
  // const { setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Button bg="primary" onClick={handleLogOut}>
      {/* <FontAwesomeIcon icon={faRightFromBracket} size="lg" /> */}
    </Button>
  );
};
