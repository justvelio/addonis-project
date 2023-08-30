import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import {
  ref, uploadBytesResumable, getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { storage, db } from "../../../config/firebase-config"; // Adjust the path accordingly

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
    const storageRef = ref(storage, 'plugins/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newPluginRef = dbRef(db, 'plugins/');
          await set(newPluginRef, {
            filename: file.name,
            url: downloadURL,
            name,
            description,
            creator,
            sourceCodeURL,
            tags,
            isHidden,
          });
          resolve(downloadURL);
        }
      );
    });
  };


  const uploadToGitHub = async (downloadURL) => {
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    const fileContent = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const data = {
      message: `Adding plugin ${file.name}`,
      content: fileContent,
    };

    const response = await fetch("https://api.github.com/repos/DNMetodiev/Addonis/contents/plugins/" + file.name, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub Error:', errorData);
      throw new Error("GitHub upload failed");
    }

    return response.json();
  };


  const handleSubmit = async () => {
    try {
      const firebaseURL = await uploadToFirebase();
      const gitResponse = await uploadToGitHub(firebaseURL);
      console.log("Uploaded to Firebase:", firebaseURL);
      console.log("GitHub Response:", gitResponse);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} alignItems="flex-start" mt='64px'>
        <Heading>Upload Plugin</Heading>
        <FormControl id="name">
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description:</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id="creator">
          <FormLabel>Creator:</FormLabel>
          <Input type="text" value={creator} onChange={(e) => setCreator(e.target.value)} />
        </FormControl>
        <FormControl id="file">
          <FormLabel>Plugin File:</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
        <FormControl id="source-url">
          <FormLabel>Source Code URL:</FormLabel>
          <Input type="text" value={sourceCodeURL} onChange={(e) => setSourceCodeURL(e.target.value)} />
        </FormControl>
        <FormControl id="tags">
          <FormLabel>Tags:</FormLabel>
          <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., utility, design" />
        </FormControl>
        <Checkbox isChecked={isHidden} onChange={() => setIsHidden(!isHidden)}>
          Apply Hidden Flag (Hides plugin from public)
        </Checkbox>
        <Button onClick={handleSubmit} colorScheme="teal">Upload</Button>
      </VStack>
    </Box>
  );
}