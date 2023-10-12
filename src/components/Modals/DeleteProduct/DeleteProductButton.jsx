import { Button, useDisclosure } from "@chakra-ui/react";
import { ModalDelete } from "./ModalDelete";
import { TrashIcon } from "../../../icons/TrashIcon";

export const DeleteProductButton = ({ productId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>
        <TrashIcon />
      </Button>
      <ModalDelete isOpen={isOpen} onClose={onClose} id={productId} />
    </div>
  );
};
