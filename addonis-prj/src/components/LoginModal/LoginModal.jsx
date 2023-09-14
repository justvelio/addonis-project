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
  IconButton,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { loginUser } from "../../services/auth.service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onClose = () => {
    setIsOpen(false);
    setFormData({ email: "", password: "" });
    setFormErrors({ email: "", password: "" });
    setShowPassword(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      {user ? (
        <span className="text-white mr-4">{user.username}</span>
      ) : (
        <Button
          size="md"
          color={"white"}
          bg={"blackAlpha.600"}
          _hover={{bgColor: 'blackAlpha.800'}}
          onClick={onOpen}
        >
          Sign In
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
                />
                <FormErrorMessage>{formErrors.email}</FormErrorMessage>
              </FormControl>
              <FormControl mt={4} isInvalid={!!formErrors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={
                        showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )
                      }
                      onClick={togglePasswordVisibility}
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formErrors.password}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              size={"sm"}
              _hover={"transparent"}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
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
