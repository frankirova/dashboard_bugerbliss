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
import { ModalEdit } from "./ModalEdit";
import { UpdateIcon } from "../../../icons/UpdateIcon";

export const EditProductButton = ({ productId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        // mt={4}
        // px={4}
        // py={2}
        // rounded="md"
        // bg="blue.500"
        // color="white"
        // fontWeight="medium"
        onClick={onOpen}
      >
        <UpdateIcon />
        <ModalEdit id={productId} onClose={onClose} isOpen={isOpen} />
      </Button>
    </div>
  );
};
