import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import StarRating from "./StarRating/StarRating";

const AddonCards = ({
  title,
  description,
  imageUrl,
  rating,
  date,
  authorName,
  issuesCount,
  downloadUrl,
}) => {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={imageUrl} align={'center'} fit={'cover'} h={'100%'} w={'100%'}/>
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <StarRating />
          <Text color={"gray.500"}>{description}</Text>
          <Text fontWeight={600}>Issues{issuesCount}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{authorName}</Text>
            <Text color={"gray.500"}>{date}</Text>
            <Text fontWeight={600}>{rating}</Text>
            <Button onClick={() => {window.open(downloadUrl, '_blank')}}>Download</Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default AddonCards;
