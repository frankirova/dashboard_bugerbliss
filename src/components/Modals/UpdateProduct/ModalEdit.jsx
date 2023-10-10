import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "../../../hooks/useForm";
import { ProductForm } from "../AddProduct/ProductForm";
import { product } from "../../../supabase/products";

export const ModalEdit = ({ isOpen, onClose, id }) => {
  const initialState = {
    id: "",
    name: "",
    price: 1,
    image: "",
    stock: 1,
  };

  const { formState, handleChange } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState) {
      product.update({ ...formState, id: id }, id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProductForm handleChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            No, cerrar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Si, editar producto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
