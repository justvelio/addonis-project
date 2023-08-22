import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, useDisclosure, Flex } from "@chakra-ui/react";

export default function CategoriesModal({ isOpen: modalIsOpen, onClose, openOverlayOneModal }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(50deg)'
    />
  );

  const { isOpen, onOpen, onClose: modalOnClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Modal isCentered isOpen={modalIsOpen} onClose={onClose} size={'2xl'}>
        {overlay}
        {openOverlayOneModal && openOverlayOneModal()}
        <ModalContent backgroundColor={'transparent'}>
          <ModalHeader textColor={'white'}>Choose which core of your brain you want to improve</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify={'space-between'}>
            <Button backgroundColor={'transparent'} _hover={'bg-transparent'} color={'blue'}>LEFT</Button>
            <Button backgroundColor={'transparent'} _hover={'bg-transparent'} color={'red'}>RIGHT</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
