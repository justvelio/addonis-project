import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  ModalFooter,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import AppContext from "../../context/AppContext";
import { registerUser } from "../../services/auth.service";

export default function SignUpModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const { setContext } = useContext(AppContext)

  const handleSignup = async () => {
    try {
      const { firstName, lastName, username, email, password, phone } = formData;
      const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
        phone
      }
      await registerUser(email, password, userData);

      setContext({
        user: {
          username: userData.username,
          email: userData.email
        }
      })
      onClose();
    } catch (error) {
      console.error("Signup err:", error);
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
      <Button size="sm" onClick={onOpen}>
        Sign Up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" w={"full"}>
            Be Part of the Smart Home Revolution:🌐
          </ModalHeader>
          <ModalBody>
            <Stack spacing={6}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </FormControl>

              <Button
                loadingText="Submitting"
                size="md"
                bg="yellow.400"
                color="black"
                _hover={{
                  bg: "yellow.500",
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
