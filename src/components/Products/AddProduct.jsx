import { Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { ProductContext } from "../../context/ProductContext";
import { useContext, useState } from "react";
import { addProduct } from "../../helpers/Products/addProduct";
import { useForm } from "../../hooks";

export const AddProduct = () => {
  const { products, isLoading } = useContext(ProductContext);
  const [img, setImg] = useState();
  const handleSetImage = (e) => {
    setImg(e.target.files[0]);
  };

  // console.log(img[0].name);
  const { handleChange, formState, updateFormState } = useForm();

  // if (img) {
  //   updateFormState(...formState, )
  // }
  return (
    <Flex direction="column">
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
          onChange={handleSetImage}
          type="file"
          name="image"
          id="fileInput"
          // value={img[0]?.name}
          value={products.image}
        />
      </form>
      <Button onClick={() => addProduct({ ...formState }, img)}>Guardar</Button>
    </Flex>
  );
};
