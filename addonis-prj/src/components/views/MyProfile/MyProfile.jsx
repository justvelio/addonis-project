import React, { useState, useEffect, useContext } from "react";
import { firebaseConfig } from "../../../config/firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../../../services/users.service";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Text,
  Stack,
  Heading,
  Button,
  Flex,
  Image,
  useColorModeValue,
  Avatar,
  Link,
  Center,
  Spacer,
  SimpleGrid, // Import SimpleGrid for responsiveness
} from "@chakra-ui/react";

const defaultProfilePictureURL =
  "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-6-1024x1024.jpg";

const MyProfileView = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        getUserData(uid)
          .then((userData) => {
            if (userData) {
              setUserData(userData);
            } else {
              console.log("No user data found");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <Center h={'93vh'}>
      <Box
        maxW={{ base: "100%", md: "800px" }} // Adjust the max width for responsiveness
        w={"100%"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box h={"160px"} w={"full"}>
          <Text
            textAlign={"center"}
            pt={10}
            fontSize={{ base: "2xl", sm: "3xl" }}
            fontWeight={"bold"}
          >
            Personal Information
          </Text>
        </Box>
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"2xl"}
            src={userData.profilePicture || defaultProfilePictureURL}
            css={{ border: "2px solid white" }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"3xl"} fontWeight={500} fontFamily={"body"}>
              {userData.firstName} {userData.lastName}
            </Heading>
            <Text color={"gray.700"} textAlign={"center"} fontWeight={500}>
              Username:
              <Spacer />
              {userData.username}
            </Text>
          </Stack>

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
          >
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>Email:</Text>
              <Text fontSize={"md"} color={"gray.500"}>
                {userData.email}
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>Uploaded Add-ons</Text>
              <Text fontSize={"md"} color={"gray.500"}>
                addons
              </Text>
            </Stack>
          </SimpleGrid>

          <Box pt={12}>
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
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default MyProfileView;
