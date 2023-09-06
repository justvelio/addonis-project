import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../config/firebase-config";
import { getUserData } from "../../../services/users.service";
import {
  Box,
  Text,
  VStack,
  Stack,
  Checkbox,
  FormControl,
  Container,
  Heading,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ref, serverTimestamp, set } from "firebase/database";
import TagComponent from "../../TagComponent/TagComponent";
import { storage } from "../../../config/firebase-config";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getPluginByName } from "../../../services/extension.service";

const GITHUB_TOKEN = "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";

export default function UploadPlugin() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [githubRepoLink, setGithubRepoLink] = useState("");
  
  const toast = useToast();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid)
          .then((data) => {
            setIsBlocked(data.isBlocked);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            toast({
              title: "Error fetching user data.",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      }
    });
  }, [toast]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchGitRepositoryInfo = async () => {
    try {
      const [owner, repoName] = gitHubRepoLink.split('/').slice(+2);
      const response = await fetch('https://api.github.com/repos/${owner}/${repoName}');
      if(!response.ok){
        console.error('GitHub API Error', response.statusText);
        return;
      }

      const repoInfo = await response.json();

      const issuesCount = repoInfo.open_issues_count;
      const totalDownloads = repoInfo.watchers_count;
      const lastUpdate = new Date(repoInfo.updated_at).toLocaleDateString();
    }catch(error){
      console.error('Error fetching GitHub repo info', error)
  }
  }

  const uploadToStorage = async (extension, fileName) => {
    const extensionsRef = storageRef(storage, `/Extensions/${fileName}`);

    const snapshot = await uploadBytes(extensionsRef, extension);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const addExtensionToDB = async (downloadUrl) => {
    const newPluginRef = ref(db, `plugins/${name}`);

    const pluginData = {
      name,
      description,
      creator: auth.currentUser?.uid || "Anonymous", // authenticated users ONLY
      tags,
      isHidden,
      githubRepoLink, // Add GitHub repo link to plugin data
      date: serverTimestamp(),
      downloadUrl,
      status: "pending",
      rating: 0,
      // repoOwner:
      // repo: 
    };

    try {
      await set(newPluginRef, pluginData);
      console.log("Successfully uploaded metadata and download link to Firebase");
    } catch (error) {
      console.error("Failed to upload to Firebase:", error);
    }
  };

  // const uploadToGitHub = async () => {
  //   const headers = {
  //     Authorization: `token ${GITHUB_TOKEN}`,
  //     Accept: "application/vnd.github.v3+json",
  //     "Content-Type": "application/json",
  //   };

  //   const fileContent = await new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(",")[1]);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });

  //   const data = {
  //     message: `Adding plugin ${file.name}`,
  //     content: fileContent,
  //   };

  //   const response = await fetch(
  //     `https://api.github.com/repos/DNMetodiev/Addonis/contents/plugins/${file.name}`,
  //     {
  //       method: "PUT",
  //       headers,
  //       body: JSON.stringify(data),
  //     }
  //   );

  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     console.error("GitHub Error:", errorData);
  //     throw new Error("GitHub upload failed");
  //   }

  //   const responseData = await response.json();
  //   return responseData.content.download_url;
  // };

  const handleSubmit = async () => {
    const fileExtension = file.name.split('.');
    const fileNameExtension = fileExtension[fileExtension.length - 1];
    
    const plugin = await getPluginByName(name);
    
    if (plugin) {
      toast({
        title: "Upload Failed.",
        description: "Plugin with this name already exists.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log('Plugin with this name already exists');
    } else {
      const downloadUrl = await uploadToStorage(
        file,
        `${name}.${fileNameExtension}`
      );
      await addExtensionToDB(downloadUrl);
    
      setDownloadUrl(downloadUrl);
    
      toast({
        title: "Upload Successful.",
        description: "Your plugin has been uploaded for review.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    if(githubRepoLink){
      await fetchGitRepositoryInfo
    }
    
  };

  return (
    <Box position="relative" textAlign="center" py={20}>
      <Container maxW={"3xl"} py={6}>
        <Stack bg="white" rounded="xl" p={8} spacing={8} align="center">
          <Stack spacing={3} textAlign="center" pt={12}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            >
              Upload your
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                .plugin
              </Text>
            </Heading>
            <Text mt={5} color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Your upload needs to be authorized by an admin in order to be displayed on our website.
            </Text>
          </Stack>

          <VStack spacing={4} alignItems="flex-start" mt="5px" w="100%">
            <FormControl id="name">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Name:
              </FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Description:
              </FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl id="file">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Plugin File:
              </FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>

            <FormControl id="tags">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Tags:
              </FormLabel>
              <TagComponent
                mode="edit"
                allTags={["utility", "design", "exampleTag1", "exampleTag2"]}
                selectedTags={tags}
                onTagChange={setTags}
              />
            </FormControl>

            <FormControl id="githubRepoLink">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                GitHub Repository Link:
              </FormLabel>
              <Input
                type="text"
                value={githubRepoLink}
                onChange={(e) => setGithubRepoLink(e.target.value)}
              />
            </FormControl>
          </VStack>

          <Checkbox
            isChecked={isHidden}
            onChange={() => setIsHidden(!isHidden)}
          >
            Apply Hidden Flag (Hides plugin from the public)
          </Checkbox>

          <Button
            w="full"
            bg={useColorModeValue("#151f21", "gray.900")}
            color="white"
            rounded="md"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
