import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ModalDelete } from "./ModalDelete";
import { TrashIcon } from "../../../icons/TrashIcon";

export const DeleteProductButton = ({ productId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        // mt={4}
        // px={4}
        // py={2}
        // rounded="md"
        // bg="red.500"
        // fontWeight="medium"
        onClick={onOpen}
      >
        <TrashIcon />
      </Button>
      <ModalDelete isOpen={isOpen} onClose={onClose} id={productId} />
    </div>
  );
};
