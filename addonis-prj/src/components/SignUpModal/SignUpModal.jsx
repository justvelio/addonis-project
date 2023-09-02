import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const { setContext } = useContext(AppContext);

  const handleSignup = async () => {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
        phone,
      } = formData;

      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        return;
      }

      if (!isValidEmail(email)) {
        setValidEmail(false);
        return;
      }

      const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
        phone,
        role: 'user',
      };
      await registerUser(email, password, userData);

      setContext({
        user: {
          username: userData.username,
          email: userData.email,
        },
      });
      onClose();
    } catch (error) {
      console.error("Signup err:", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onClose = () => {
    setIsOpen(false);
    setPasswordsMatch(true);
    setValidEmail(true);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        size="sm"
        className="group [transform:translateZ(0)] px-6 py-3 rounded-lg bg-gray-200 overflow-hidden relative before:absolute before:bg-sky-600 before:bottom-0 before:left-0 before:h-full before:w-full before:-translate-x-full hover:before:translate-x-0 before:transition before:ease-in-out before:duration-500"
      >
        <span className="relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500">
          Sign Up
        </span>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" w={"full"}>
            Be Part of the Smart Home Revolution:🌐
          </ModalHeader>
          <ModalBody>
            <Stack spacing={6}>
              <Box display="flex" justifyContent="space-between">
                <FormControl id="firstName" isRequired w="48%">
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl id="lastName" isRequired w="48%">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormControl>
              </Box>

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
                  borderColor={validEmail ? "gray.300" : "red.500"}
                />
                {!validEmail && (
                  <Box mt={1} color={"red.500"}>
                    Invalid email
                  </Box>
                )}
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
                      _hover={{ bg: "transparent" }}
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

              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    borderColor={passwordsMatch ? "gray.300" : "red.500"}
                  />
                  <InputRightElement h="full">
                    <Button
                      _hover={{ bg: "transparent" }}
                      variant="ghost"
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!passwordsMatch && (
                  <Box mt={1} color="red.500">
                    Passwords do not match
                  </Box>
                )}
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
                size={"md"}
                loadingText="Submitting"
                onClick={handleSignup}
                className="px-6 py-3 bg-gray-200 text-black rounded-lg"
              >
                Sign Up
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  );
}
