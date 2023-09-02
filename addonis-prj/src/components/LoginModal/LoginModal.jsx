import React, { useState, useContext } from "react";
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
} from "@chakra-ui/react";
import { loginUser } from "../../services/auth.service";
import AppContext from "../../context/AppContext";
import { getUserData } from "../../services/users.service";
import { checkUserExistence } from "../../services/auth.service";


export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      const userExists = await checkUserExistence(formData.email);
      if (userExists) {
        await loginUser(formData.email, formData.password);
        onClose();
      } else {
        console.error("User does not exist.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      {user ? (
        <span className="text-white mr-4">{user.username}</span>
      ) : (
        <Button size='sm' color={'white'} bg={'transparent'} _hover={'transparent'} onClick={onOpen} className="group text-gray-200 hover:text-sky-600 transition ease-in-out duration-200">Log In <span aria-hidden="true" className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200">→</span></Button>
        // <Button
        //   size="sm"
        //   bg={"transparent"}
        //   _hover={{ bg: "transparent" }}
        //   color={"grey"}
        //   onClick={onOpen}
        // >
        //   Log In
        // </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            Access Your Smart Hub: 📲
          </ModalHeader>
          <ModalBody>
            <form noValidate>
              <FormControl mt={4}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </FormControl>
              <Checkbox mt={4}>Remember me</Checkbox>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size={"sm"} _hover={'transparent'} onClick={onClose}>
              Cancel
            </Button>
            <Button size={'sm'} onClick={handleLogin} className="px-6 py-3 bg-gray-200 text-black rounded-lg hover:scale-110 active:scale-90 transition-transform ease-in-out duration-200">Log In</Button>
            {/* <Button
              colorScheme="yellow"
              size={"sm"}
              ml={1}
              onClick={handleLogin}
            >
              Log in
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
