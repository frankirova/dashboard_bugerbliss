import { extendTheme } from "@chakra-ui/react";

export const MyNewTheme = extendTheme({
  colors: {
    primary: "#7c9520",
    // secondary: "#ecf2f6",
    secondary: "#f3e6d4",
    tertiary: {
      50: "#f3e6d4",
      100: "#f3e6d4",
      200: "#f3e6d4",
      300: "#f3e6d4",
      400: "#f3e6d4",
      500: "#f3e6d4",
      600: "#1E88E5",
      700: "#1976D2",
      800: "#1565C0",
      900: "#0D47A1",
    },
  },
  fonts: {
    body: "roboto",
  },
  components: {
    Button: {
      // Estilos globales para todos los botones
      baseStyle: {
        letterSpacing: "0.06em",
        fontWeight: "500",
      },
      // Estilos para variantes de botón específicas
      variants: {
        solid: {
          bg: "primary",
          color: "white",
          _hover: { bg: "secondary", color: "primary" },
        },
        ghost: {
          color: "primary",
          _hover: { bg: "secondary", color: "primary" },
        },
        // Agrega más variantes según tus necesidades
      },
    },
    Heading: {
      // Estilos globales para todos los botones
      baseStyle: {
        // letterSpacing: "0.06em",
        // fontWeight: "500",
        textAlign: "center",
        bg: "primary",
        color: "white",
        my: 3,
        p: 3,
      },
    },
    Text: {
      baseStyle: {
        fontSize: "lg",
      },
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: "body",
        fontWeight: "normal",
        letterSpacing: "0.06em",
      },
    },
  },
});
