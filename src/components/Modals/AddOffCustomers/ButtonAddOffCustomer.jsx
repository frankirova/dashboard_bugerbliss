import { Button, useDisclosure } from "@chakra-ui/react";
import { ModalAddOffCustomer } from "./ModalAddOffCustomer";

export const ButtonAddOffCustomer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen} variant={"solid"}>
        Cupon
      </Button>
      <ModalAddOffCustomer isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
