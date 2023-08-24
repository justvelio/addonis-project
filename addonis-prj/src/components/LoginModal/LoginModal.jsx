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
import { loginUser } from '../../services/auth.service';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      onClose();
      // console.log('vurvi li')
    } catch (error) {
      console.error('Login err:', error)
      // console.log('greshkaaa')
    }
  }

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Button size="sm" bg={'transparent'} _hover={{ bg: 'transparent' }} color={'grey'} onClick={onOpen}>
        Log In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Access Your Smart Hub: 📲</ModalHeader>
          <ModalBody>
            <form noValidate>
              <FormControl mt={4}>
                <FormLabel>Email address</FormLabel>
                <Input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Checkbox mt={4}>Remember me</Checkbox>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size={'sm'} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="yellow" size={'sm'} ml={1} onClick={handleLogin}>
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
