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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { updateUserProfile } from "../../services/users.service";
import reauthenticateUser from "./reauthenticateUser";
import { getAuth } from "firebase/auth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import icons

const UpdateProfile = ({ setUserData }) => {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

    if (profilePicture) {
      updatedData.profilePicture = profilePicture;
    }

    const success = await updateUserProfile(user.uid, updatedData);

    if (success) {
      alert("Profile updated successfully!");
      setUserData((prevData) => ({ ...prevData, ...updatedData }));

      setNewEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setNewFirstName("");
      setNewLastName("");
      setNewPhone("");
      setCurrentPassword("");
    } else {
      alert("Profile update failed. Please try again.");
    }
  };

  return (
    <Center h={"93vh"}>
      <Box
        maxW={{ base: "100%", md: "800px" }}
        w={"100%"}
        pt={5}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
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
            <FormLabel>Profile Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </FormControl>

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
            <InputGroup>
              <Input
                placeholder="New Password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={toggleShowNewPassword}
                  bg="transparent"
                >
                  {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <Input
                placeholder="Confirm Your Password To Save Changes"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={toggleShowConfirmPassword}
                  bg="transparent"
                >
                  {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
        <div className="pb-10 text-center">
          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
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
  );
};

export default UpdateProfile;
