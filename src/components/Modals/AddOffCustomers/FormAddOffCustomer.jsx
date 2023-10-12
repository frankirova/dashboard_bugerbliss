import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const FormAddOffCustomer = ({ handleChange }) => {
  return (
    <form className="flex flex-col space-y-4 mt-4">
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input type="text" name="name" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Numero de telefono</FormLabel>
        <Input type="text" name="phone" onChange={handleChange} />
      </FormControl>
    </form>
  );
};
