import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Icon,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(null);

  const openModalWithOverlay = (customOverlay) => {
    setOverlay(customOverlay);
    onOpen();
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <>
      <Button
        bg={"transparent"}
        _hover={"transparent"}
        _active={"transparent"}
        leftIcon={<Icon as={SearchIcon} 
        color={'white'}/>}
        onClick={() => openModalWithOverlay(<OverlayOne />)}
      ></Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent marginTop="20vh">
          <Input type="text" placeholder="Search..." />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
