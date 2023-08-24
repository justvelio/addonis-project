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
import { getUserData } from "../../services/auth.service";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, setContext } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      const userCredential = await loginUser(formData.email, formData.password);
      console.log("userCredential:", userCredential);
      const uid = userCredential.user.uid;
      // console.log("uid:", uid);
      const additionalData = await getUserData(uid);
      // console.log("additionalData:", additionalData);
      const userWithAdditionalData = {
        uid,
        ...additionalData
      };
  
      setContext((prevState) => ({ ...prevState, user: userWithAdditionalData }));
      onClose();
    } catch (error) {
      console.error("Login err:", error);
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
        <span className="text-slate-700 mr-4">{user.username}</span>
      ) : (
        <Button
          size="sm"
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          color={"grey"}
          onClick={onOpen}
        >
          Log In
        </Button>
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
            <Button variant="ghost" size={"sm"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="yellow"
              size={"sm"}
              ml={1}
              onClick={handleLogin}
            >
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
