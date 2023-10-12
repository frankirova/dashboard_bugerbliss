import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const ProductForm = ({ handleChange }) => {
  return (
    <form className="flex flex-col space-y-4 mt-4">
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input type="text" name="name" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Precio</FormLabel>
        <Input type="number" name="price" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Stock</FormLabel>
        <Input type="number" name="stock" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Imagen</FormLabel>
        <Input
          id="fileInput"
          name="image"
          onChange={handleChange}
          type="file"
        />
      </FormControl>
    </form>
  );
};
