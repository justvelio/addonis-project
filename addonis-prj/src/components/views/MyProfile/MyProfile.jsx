import React, { useState, useEffect, useContext } from "react";
import { firebaseConfig } from "../../../config/firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../../../services/users.service";
import { useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase-config";
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
  SimpleGrid,
} from "@chakra-ui/react";
import { equalTo, get, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";

export const defaultProfilePictureURL =
  "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg";

const MyProfileView = () => {
  const [userData, setUserData] = useState(null);
  const [userPlugins, setUserPlugins] = useState(0);

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

          const pluginsRef = ref(db, 'plugins');
          get(pluginsRef)
          .then((snapshot) => {
            if(snapshot.exists()) {
              const pluginsData = Object.values(snapshot.val())
              const userPlugins = pluginsData.filter((plugin) => plugin.creator === uid);

              const count = userPlugins.length;
              setUserPlugins(count)
            }else{
              console.log('No Plugins');
            }
          })
          .catch((error) => {
            console.error('Error fetching plugins:', error)
          });
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center h={'93vh'}>
      <Box
      bgColor={'white'}
        maxW={{ base: "100%", md: "800px" }}
        w={"100%"}
        _hover={{ bgColor: "gray.200", _dark: { bgColor: "gray.300" } }}
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
              <Text fontWeight={600}>Uploaded Plugins</Text>
              <Text fontSize={"md"} color={"gray.500"}>
                {userPlugins === 1 ? `${userPlugins} plugin` : `${userPlugins} plugins`}
              </Text>
            </Stack>
          </SimpleGrid>

          <Box pt={12}>
            <Button
              w={"full"}
              mt={8}
              bg={'black'}
              color={"white"}
              rounded={"md"}
              _hover={{ bgColor: 'gray.600'}}
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
