import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
export const MyModal = ({
  isOpen,
  onClose,
  modalBody,
  handleSubmit,
  header,
  textButtonOk,
  textButtonCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            {textButtonCancel}
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {textButtonOk}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
