import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Heading,
  Input,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

import { updateUserProfile } from "../../services/users.service";
import reauthenticateUser from "./reauthenticateUser";
import { getAuth } from "firebase/auth";
import "./UpdateProfile.css";

const UpdateProfile = ({ setUserData }) => {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleUpdate = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const updatedData = {};
    const reauthSuccess = await reauthenticateUser(
      user,
      user.email,
      currentPassword
    );

    if (!reauthSuccess) {
      alert(
        "Failed to reauthenticate. Please enter the correct current password."
      );
      return;
    }

    if (newEmail) {
      updatedData.email = newEmail;
    }

    if (newPassword) {
      updatedData.password = newPassword;
    }

    if (newFirstName) {
      updatedData.firstName = newFirstName;
    }

    if (newLastName) {
      updatedData.lastName = newLastName;
    }

    if (newPhone) {
      updatedData.phone = newPhone;
    }

    const success = await updateUserProfile(user.uid, updatedData);

    if (success) {
      alert("Profile updated successfully!");
      setUserData((prevData) => ({ ...prevData, ...updatedData }));

      setNewEmail("");
      setNewPassword("");
      setNewFirstName("");
      setNewLastName("");
      setNewPhone("");
      setCurrentPassword("");
    } else {
      alert("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="fade-in">
      <Center>
        <Box
          maxW={"800px"}
          w={"600px"}
          h={"600px"}
          bg={useColorModeValue("white", "gray.800")}
          overflow={"hidden"}
          style={{
            boxShadow: "9px 5px 10px rgba(0, 0, 0, 0.2)", // Adjust values as needed
          }}
        >
          <Stack spacing={7} p={6} bg={useColorModeValue("white", "gray.800")}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl" }}
              textAlign={"center"}
            >
              Update Your Profile
            </Heading>
            <FormControl>
              <Input
                placeholder="New First Name"
                type="text"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="New Last Name"
                type="text"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="New Email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="New Phone Number"
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Confirm Your Password To Save Changes"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
          <div className="pb-10 text-center">
            <Button
              bg={useColorModeValue("#151f21", "gray.900")}
              color="white"
              w="500px"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          </div>
        </Box>
      </Center>
    </div>
  );
};

export default UpdateProfile;
