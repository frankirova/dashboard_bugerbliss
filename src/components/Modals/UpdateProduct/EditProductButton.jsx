import { Button, useDisclosure } from "@chakra-ui/react";
import { ModalEdit } from "./ModalEdit";
import { UpdateIcon } from "../../../icons/UpdateIcon";

export const EditProductButton = ({ productId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>
        <UpdateIcon />
      </Button>
      <ModalEdit id={productId} onClose={onClose} isOpen={isOpen} />
    </div>
  );
};
