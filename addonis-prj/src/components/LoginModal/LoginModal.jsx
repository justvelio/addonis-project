import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
} from '@chakra-ui/react';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Button size="sm" bg={'transparent'} _hover={{ bg: 'transparent' }} color={'white'} onClick={onOpen}>
        Log In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in to your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form noValidate>
              <FormControl mt={4}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Checkbox mt={4}>Remember me</Checkbox>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size={'sm'} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="yellow" size={'sm'} ml={1}>
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
