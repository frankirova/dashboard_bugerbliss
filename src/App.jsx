import { Box } from "@chakra-ui/react";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { NavBar } from "./components/NavBar/NavBar";

function App() {
  return (
    <Box bg={"secondary"}>
      <NavBar />
      <AppRouter />
    </Box>
  );
}

export default App;
