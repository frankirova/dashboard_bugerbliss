import { Box } from "@chakra-ui/react";
import { AppRouter } from "./router/AppRouter";
import { NavBar } from "./components/Nav/NavBar";

function App() {
  return (
    <Box bg={"secondary"}>
      <NavBar />
      <AppRouter />
    </Box>
  );
}

export default App;
