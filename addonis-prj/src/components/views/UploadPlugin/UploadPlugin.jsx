import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Container,
  useColorModeValue,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ref as dbRef, push } from "firebase/database";
import { auth, storage, db } from "../../../config/firebase-config";

const GITHUB_TOKEN = "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";

export default function UploadPlugin() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [sourceCodeURL, setSourceCodeURL] = useState("");
  const [tags, setTags] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToFirebase = async () => {
    const newPluginRef = dbRef(db, "plugins/");
    const pluginData = {
      name,
      description,
      creator: auth.currentUser?.uid || "Anonymous",
      sourceCodeURL,
      tags,
      isHidden,
      date: new Date().toISOString(),
    };

    await push(newPluginRef, pluginData);
    console.log("Metadata uploaded to Firebase");
  };

  const uploadToGitHub = async () => {
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    const fileContent = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const data = {
      message: `Adding plugin ${file.name}`,
      content: fileContent,
    };

    const response = await fetch(
      `https://api.github.com/repos/DNMetodiev/Addonis/contents/plugins/${file.name}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub Error:", errorData);
      throw new Error("GitHub upload failed");
    }

    return response.json();
  };

  const handleSubmit = async () => {
    try {
      await uploadToFirebase();
      const gitResponse = await uploadToGitHub();
      console.log("GitHub Response:", gitResponse);
    } catch (error) {
      console.error("Error uploading:", error);
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
              Your upload needs to be authorized by an admin in order to be
              displayed on our website.
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
            <FormControl id="creator">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Creator:
              </FormLabel>
              <Input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </FormControl>
            <FormControl id="file">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Plugin File:
              </FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
            <FormControl id="source-url">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Source Code URL:
              </FormLabel>
              <Input
                type="text"
                value={sourceCodeURL}
                onChange={(e) => setSourceCodeURL(e.target.value)}
              />
            </FormControl>
            <FormControl id="tags">
              <FormLabel color={"gray.800"} lineHeight={1.1} fontSize={24}>
                Tags:
              </FormLabel>
              <Input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., utility, design"
              />
            </FormControl>
          </VStack>
          <Checkbox
            isChecked={isHidden}
            onChange={() => setIsHidden(!isHidden)}
          >
            Apply Hidden Flag (Hides plugin from public)
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
