import { NavLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const NavLinksList = ({ links, setDisplay }) => {
  return (
    <>
      {links.map((navDate) => (
        <Button
          key={navDate}
          as={NavLink}
          to={`${navDate}`}
          fontSize={["sm", "sm", "lg", "xl"]}
          onClick={() => setDisplay("none")}
          variant='ghost'
        >
          {navDate}
        </Button>
      ))}
    </>
  );
};
