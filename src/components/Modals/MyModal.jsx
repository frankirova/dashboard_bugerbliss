import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
          <HStack>
            <Button colorScheme="gray" onClick={onClose}>
              {textButtonCancel}
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {textButtonOk}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
