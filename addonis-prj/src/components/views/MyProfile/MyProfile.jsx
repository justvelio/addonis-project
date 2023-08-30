import React, { useState, useEffect } from "react";
import { firebaseConfig } from "../../../config/firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getUserData } from "../../../services/users.service";
import UpdateProfile from "../../UpdateProfile/UpdateProfile";
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
  Center,
  Spacer,
} from "@chakra-ui/react";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const defaultProfilePictureURL = 'https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-6-1024x1024.jpg'

const MyProfileView = () => {
  const [userData, setUserData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      //console.log("User UID:", uid);

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
  }, []);

  const onChangeProfilePicture = () => {
    setChangeProfilePicture(!changeProfilePicture);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <Center pt={20}>
      <div className="pt-20 pb-20">
        <Box
          maxW={"800px"}
          w={"600px"}
          h={"600px"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Box
            h={"160px"}
            w={"full"}
          >
            <Text textAlign={'center'} 
            pt={10}
            fontSize={{ base: "2xl", sm: "3xl" }}
            fontWeight={'bold'}
            >Personal Information</Text>
          </Box>
          <Flex justify={"center"} mt={-12}>
          <Avatar
              size={"2xl"}
              src={userData.profilePicture || defaultProfilePictureURL}
              css={{ border: "2px solid white" }}
              onClick={onChangeProfilePicture}
              cursor="pointer"
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

            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>Email:</Text>
                <Text fontSize={"md"} color={"gray.500"}>
                  {userData.email}
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"md"} color={"gray.500"}>
                  Followers
                </Text>
              </Stack>
            </Stack>
            <div className="pt-10">
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
              onClick={() => {
                setShowEditProfile(!showEditProfile);
              }}
            >
              {showEditProfile ? "Cancel" : "Edit Profile"}
            </Button>

            </div>
          </Box>
        </Box>
      </div>
      {showEditProfile && (
        <UpdateProfile
          setUserData={setUserData}
          changeProfilePicture={changeProfilePicture}
          setChangeProfilePicture={setChangeProfilePicture}
        />
      )}
    </Center>
  );
};

export default MyProfileView;
