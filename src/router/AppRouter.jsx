import { Route, Routes } from "react-router-dom";
import { Products } from "../components/Products/Products";
import { Orders } from "../components/Orders/Orders";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/Productos" element={<Products />} />
      <Route path="/Ordenes" element={<Orders />} />
    </Routes>
  );
};
