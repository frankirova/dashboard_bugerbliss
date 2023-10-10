import { Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useForm } from "../../hooks";
import { updateProduct } from "../../helpers/Products/updateProduct";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const { products, isLoading } = useContext(ProductContext);
  const { handleChange, formState } = useForm();
  const { id } = useParams();
  return (
    <div>
      <Heading>EditProduct</Heading>
      <Flex
        alignItems="center"
        direction="column"
        justifyContent="center"
        p={6}
      >
        <form>
          <FormLabel>Categoria</FormLabel>
          <Input
            onChange={handleChange}
            type="text"
            name="category"
            value={products.category}
          />
          <FormLabel>Precio</FormLabel>
          <Input
            onChange={handleChange}
            type="number"
            name="price"
            value={products.price}
          />
          <FormLabel>Stock</FormLabel>
          <Input
            onChange={handleChange}
            type="number"
            name="stock"
            value={products.stock}
          />
          <FormLabel>Nombre</FormLabel>
          <Input
            onChange={handleChange}
            type="text"
            name="title"
            value={products.title}
          />
          <FormLabel>Imagen</FormLabel>
          <Input
            onChange={handleChange}
            type="file"
            name="image"
            value={products.image}
          />
        </form>
        <Button onClick={() => updateProduct(id, formState)} colorScheme="teal">
          Guardar
        </Button>
      </Flex>
    </div>
  );
};
