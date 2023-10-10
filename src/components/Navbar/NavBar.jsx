import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import { authContext } from "../../context";
import { NavLinksList } from "../Navbar/NavLinksList";
import { LogOut } from "../Navbar/LogOut";
import { NavButtonGroup } from "../Navbar/NavButtonGroup";

// import "../../styles/__navbar.css";
import { Flex, HStack, IconButton, Image, Text } from "@chakra-ui/react";
// import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavBar = () => {
  const links = ["Productos", "Ordenes"];
  const [display, setDisplay] = useState("none");
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
