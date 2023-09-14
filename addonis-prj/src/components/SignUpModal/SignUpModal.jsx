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
  const [validUsername, setValidUsername] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });
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

      if (
        !firstName ||
        !lastName ||
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !phone
      ) {
        setFieldErrors({
          firstName: !firstName,
          lastName: !lastName,
          username: !username,
          email: !email,
          password: !password,
          confirmPassword: !confirmPassword,
          phone: !phone,
        });
        return;
      }

      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        return;
      }

      if (username.length < 2 || username.length > 20) {
        setValidUsername(false);
        return;
      }

      if (!isValidEmail(email)) {
        setValidEmail(false);
        return;
      }

      if (phone.length !== 10) {
        setFieldErrors({ ...fieldErrors, phone: true });
        return;
      }

      const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
        phone,
        role: "user",
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
    setFieldErrors({
      firstName: false,
      lastName: false,
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
      phone: false,
    });
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <div>
      <Button
      bgColor={'whiteAlpha.700'}
      _hover={{bgColor: 'whiteAlpha.900'}}
        onClick={onOpen}
        size="md"
        >
          Sign Up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <form onSubmit={handleFormSubmit}>
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
                    borderColor={fieldErrors.firstName ? "red.500" : "gray.300"}
                  />
                  {fieldErrors.firstName && (
                    <Box mt={1} color={"red.500"}>
                      
                    </Box>
                  )}
                </FormControl>

                <FormControl id="lastName" isRequired w="48%">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    borderColor={fieldErrors.lastName ? "red.500" : "gray.300"}
                  />
                  {fieldErrors.lastName && (
                    <Box mt={1} color={"red.500"}>
                      
                    </Box>
                  )}
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
                  borderColor={fieldErrors.username ? "red.500" : "gray.300"}
                />
                {fieldErrors.username && (
                  <Box mt={1} color={"red.500"}>
                    
                  </Box>
                )}
                {!validUsername && (
                  <Box mt={1} color={"red.500"}>
                    Username must be between 2 and 20 characters
                  </Box>
                )}
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  borderColor={fieldErrors.email ? "red.500" : "gray.300"}
                />
                {fieldErrors.email && (
                  <Box mt={1} color={"red.500"}>
                    
                  </Box>
                )}
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
                    borderColor={fieldErrors.password ? "red.500" : "gray.300"}
                  />
                  {fieldErrors.password && (
                    <Box mt={1} color={"red.500"}>
                      
                    </Box>
                  )}
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
                    borderColor={
                      fieldErrors.confirmPassword ? "red.500" : "gray.300"
                    }
                  />
                  {fieldErrors.confirmPassword && (
                    <Box mt={1} color={"red.500"}>
                      
                    </Box>
                  )}
                  {!passwordsMatch && (
                    <Box mt={1} color="red.500">
                      Passwords do not match
                    </Box>
                  )}
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
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  borderColor={fieldErrors.phone ? "red.500" : "gray.300"}
                />
                {fieldErrors.phone && (
                  <Box mt={1} color={"red.500"}>
                    Phone number must be 10 digits.
                  </Box>
                )}
              </FormControl>

              <Button
                type="submit"
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
        </form>
      </Modal>
    </div>
  );
}
