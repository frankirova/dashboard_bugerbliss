import { AddProductForm } from "./AddProductForm";
import { Button, useDisclosure } from "@chakra-ui/react";

export const AddProductFormButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen} variant={"solid"}>
        Agregar producto
      </Button>
      <AddProductForm isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
