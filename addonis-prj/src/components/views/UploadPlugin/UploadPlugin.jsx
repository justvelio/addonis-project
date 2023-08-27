// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   VStack,
// } from "@chakra-ui/react";

// export default function UploadPlugin() {
//   const [file, setFile] = useState(null);
//   const [sourceCodeURL, setSourceCodeURL] = useState("");
//   const [tags, setTags] = useState("");
//   const [isHidden, setIsHidden] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = () => {
//     console.log(file, sourceCodeURL, tags, isHidden);
//   };

//   return (
//     <Box p={4} mt="64px">  {/* Added margin to push content below header */}
//       <VStack spacing={4} alignItems="flex-start">
//         <Heading>Upload Plugin</Heading>

//         <FormControl id="file">
//           <FormLabel>Plugin File:</FormLabel>
//           <Input type="file" onChange={handleFileChange} />
//         </FormControl>

//         <FormControl id="source-url">
//           <FormLabel>Source Code URL:</FormLabel>
//           <Input type="text" value={sourceCodeURL} onChange={(e) => setSourceCodeURL(e.target.value)} />
//         </FormControl>

//         <FormControl id="tags">
//           <FormLabel>Tags:</FormLabel>
//           <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., utility, design" />
//         </FormControl>

//         <Checkbox isChecked={isHidden} onChange={() => setIsHidden(!isHidden)}>
//           Apply Hidden Flag (Hides plugin from public)
//         </Checkbox>

//         <Button onClick={handleSubmit} colorScheme="teal">Upload</Button>
//       </VStack>
//     </Box>
//   );
// }