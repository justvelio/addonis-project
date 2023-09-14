import React, { useState, useEffect, useContext } from "react";
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
  FormErrorMessage,
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
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const { user } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth, email, password);

      onClose();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setFormErrors({ ...formErrors, email: "Invalid email address." });
          break;
        case "auth/user-disabled":
          setFormErrors({ ...formErrors, email: "User account is disabled." });
          break;
        case "auth/user-not-found":
          setFormErrors({
            ...formErrors,
            email: "User not found. Please register first.",
          });
          break;
        case "auth/wrong-password":
          setFormErrors({ ...formErrors, password: "Incorrect password." });
          break;
        default:
          console.error("Login error:", error.message);
          break;
      }
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setFormData({ email: "", password: "" });
    setFormErrors({ email: "", password: "" });
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div>
      {user ? (
        <span className="text-white mr-4">{user.username}</span>
      ) : (
        <Button
          size="sm"
          color={"teal.500"}
          bg={"transparent"}
          _hover={"transparent"}
          onClick={onOpen}
          className="group text-gray-200 hover:text-sky-600 transition ease-in-out duration-200"
        >
          Log In{" "}
          <span
            aria-hidden="true"
            className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
          >
            →
          </span>
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            Access Your FutureHome Account: 📲
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form noValidate>
              <FormControl mt={4} isInvalid={!!formErrors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onKeyDown={handleKeyPress}
                />
                <FormErrorMessage>{formErrors.email}</FormErrorMessage>
              </FormControl>
              <FormControl mt={4} isInvalid={!!formErrors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onKeyDown={handleKeyPress}
                />
                <FormErrorMessage>{formErrors.password}</FormErrorMessage>
              </FormControl>
              <Checkbox mt={4}>Remember me</Checkbox>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size={"sm"} _hover={"transparent"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              size={"sm"}
              onClick={handleLogin}
              className="px-6 py-3 bg-gray-200 text-black rounded-lg hover:scale-110 active:scale-90 transition-transform ease-in-out duration-200"
            >
              Log In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
