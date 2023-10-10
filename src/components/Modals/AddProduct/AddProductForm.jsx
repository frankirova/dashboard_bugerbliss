import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { getUuid } from "../../../helpers";
import { useForm } from "../../../hooks/useForm";
import { ProductForm } from "../AddProduct/ProductForm";
import { product } from "../../../supabase/products";

export const AddProductForm = ({ isOpen, onClose }) => {
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
      product.add({ ...formState, id: getUuid() });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Producto</ModalHeader>
        <ModalBody>
          <ProductForm handleChange={handleChange} onClose={onClose} />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
