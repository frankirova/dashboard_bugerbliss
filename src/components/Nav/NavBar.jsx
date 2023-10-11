import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavLinksList } from "../Nav/NavLinksList";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "./LogOut";

export const NavBar = () => {
  const links = ["Productos", "Ordenes"];
  const [display, setDisplay] = useState("none");
  const { user, handleLogin } = useContext(AuthContext);
  return (
    <Flex mt="auto" justify="space-around" bgColor="secondary" minH="10vh">
      <Flex
        minW="90vw"
        fontSize="xl"
        mx="2rem"
        justify="space-between"
        align="center"
      >
        <NavLink to="/">
          <Image src="/assets/img3.jpg" alt="logo-focus"></Image>
        </NavLink>

        <Flex
          fontSize={["sm", "sm", "sm", "lg"]}
          p={4}
          gap="1.4rem"
          display={["none", "none", "flex", "flex"]}
        >
          <NavLinksList links={links} setDisplay={setDisplay} />
        </Flex>

        {user ? <LogOut /> : <Button onClick={handleLogin}>Login</Button>}

        <Flex
          gap={3}
          fontSize="2xl"
          width="100vw"
          height="100vh"
          p={6}
          bg={"white"}
          zIndex={20}
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
          display={display}
        >
          <HStack justify="end" align>
            <IconButton
              color="primary"
              size="lg"
              // icon={<FontAwesomeIcon icon={faXmark} />}
              onClick={() => setDisplay("none")}
            />
          </HStack>
          <NavLinksList links={links} setDisplay={setDisplay} />

          <IconButton
            color="primary"
            // icon={<FontAwesomeIcon size="xl" icon={faBars} />}
            display={["flex", "flex", "none", "none"]}
            onClick={() => setDisplay("flex")}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
