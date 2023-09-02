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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";


export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      // Use Firebase Authentication to log in the user
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth, email, password);
  
      // If login is successful, close the modal or navigate to the next page
      onClose();
    } catch (error) {
      // Handle Firebase authentication errors and provide user-friendly error messages
      switch (error.code) {
        case "auth/invalid-email":
          console.error("Invalid email address.");
          // You can display an error message to the user here
          break;
        case "auth/user-disabled":
          console.error("User account is disabled.");
          // You can display an error message to the user here
          break;
        case "auth/user-not-found":
          console.error("User not found. Please register first.");
          // You can display an error message to the user here
          break;
        case "auth/wrong-password":
          console.error("Incorrect password.");
          // You can display an error message to the user here
          break;
        default:
          console.error("Login error:", error.message);
          // For other errors, you can display a generic error message
          break;
      }
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
