import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { product } from "../../../supabase/products";

export const ModalDelete = ({ isOpen, onClose, id }) => {

  const handleActionAndCloseModal = (id) => {
    product.delete(id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <p>¿Está seguro de que desea eliminar este producto?</p>
        </ModalBody>
        <ModalBody>
          <Button
            colorScheme="gray"
            onClick={onClose}
            mr={3}
          >
            No, cerrar
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => handleActionAndCloseModal(id)}
          >
            Sí, borrar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
