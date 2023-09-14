import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Link,
  Button,
  useToast,
  Center,
  Flex,
  Avatar,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { ref, get, set } from "firebase/database";
import { db, auth } from "../../config/firebase-config";
import StarDisplay from "../StarDisplay/StarDisplay";
import { getUserData } from "../../services/users.service";
import { fetchGitHubData } from "../../utils/fetchGitHubData";

function PluginDetailView() {
  const [plugin, setPlugin] = useState(null);
  const [score, setScore] = useState(0);
  const [userHasRated, setUserHasRated] = useState(false);
  const [uploaderUsername, setUploaderUsername] = useState("");
  const [uploaderProfilePicture, setUploaderProfilePicture] = useState("");
  const [githubData, setGithubData] = useState({
    openIssues: 0,
    pullRequests: 0,
    lastCommitDate: null,
    lastCommitMessage: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { id: rawId } = useParams();
  const id = rawId.trim();
  const navigate = useNavigate();
  const toast = useToast();

  // console.log(id)

  const handleDownload = () => {
    if (plugin && plugin.gitDownloadLink) {
      const downloadLink = document.createElement("a");
      downloadLink.href = plugin.gitDownloadLink;
      downloadLink.target = "_blank";
      downloadLink.click();
    } else {
      console.error("Download link not available");
    }
  };

  const fetchPluginData = async (id) => {
    const snapshot = await get(ref(db, "plugins/" + id));
    const pluginData = snapshot.val();

    if (!pluginData) {
      console.error("No data found for plugin with ID:", id);
      return;
    }

    if (pluginData.ratings && pluginData.ratings[auth.currentUser.uid]) {
      setUserHasRated(true);
      setScore(pluginData.ratings[auth.currentUser.uid]);
    }

    if (pluginData.githubRepoLink) {
      const githubData = await fetchGitHubData(pluginData.githubRepoLink);
      setGithubData(githubData);
    }

    if (pluginData.creator) {
      const uploaderData = await getUserData(pluginData.creator);
      if (uploaderData) {
        setUploaderUsername(uploaderData.username || "");
        setUploaderProfilePicture(uploaderData.profilePicture || "");
        setFirstName(uploaderData.firstName || "");
        setLastName(uploaderData.lastName || "");
      }
    }

    return pluginData;
  };

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    // console.log('string', id)
    fetchPluginData(id).then((result) => {
      setPlugin(result);
    });
  }, [id]);

  const handleRating = (selectedScore) => {
    setScore(selectedScore);
  };

  const submitRating = async () => {
    if (userHasRated) {
      toast({
        title: "Rating Failed.",
        description: "You've already rated this plugin.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const ratingsRef = ref(db, `plugins/${id}/ratings/${auth.currentUser.uid}`);
    await set(ratingsRef, score);

    setUserHasRated(true);
    toast({
      title: "Rating Submitted.",
      description: "Thank you for your feedback!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // console.log(plugin)

    

  return (
    <Flex direction="column" minHeight="100vh">
      {!plugin ? <Box pt={10}> Loading...</Box> :
      <Center py={6} flex="1">
        <Box
          maxW="445px"
          w="full"
          bg="white"
          boxShadow="2xl"
          rounded="md"
          p={6}
          overflow="hidden"
        >
          <Stack spacing="4">
            <Text
              color="green.500"
              textTransform="uppercase"
              fontWeight={800}
              fontSize="sm"
              letterSpacing={1.1}
            >
              {/* {plugin.category} */}
            </Text>
            <Heading fontSize="2xl">{plugin.name}</Heading>
            <Text color="gray.500">{plugin.description}</Text>
          </Stack>
          <Divider mt="4" />
          <Stack spacing="4" mt="4" align="center">
            <Flex align="center">
              <Avatar
                size="sm"
                src={uploaderProfilePicture}
                name={uploaderUsername}
                mr="2"
              />
              <Text className="font-medium">
                Uploader: {uploaderUsername} ({firstName} {lastName})
              </Text>
            </Flex>
            <Stack direction="row" align="center">
              <StarDisplay rating={score} onStarClick={handleRating} />
              <Text>({Object.keys(plugin.ratings).length || 0} reviews)</Text>
            </Stack>
          </Stack>
          <Stack mt="4">
            <Button
              colorScheme="teal"
              onClick={submitRating}
              isDisabled={userHasRated}
              size="sm"
            >
              Submit Rating
            </Button>
            {userHasRated && (
              <Text mt="2" color="red.500">
                You've already rated this plugin.
              </Text>
            )}
          </Stack>
          <Stack mt="4">
            <Text>Open Issues: {githubData.openIssues}</Text>
            <Text>Open Pull Requests: {githubData.pullRequests}</Text>
            <Text>
              Last Commit:{" "}
              {githubData.lastCommitDate
                ? new Date(githubData.lastCommitDate).toLocaleDateString()
                : "N/A"}
              {githubData.lastCommitMessage &&
                ` - ${githubData.lastCommitMessage}`}
            </Text>
          </Stack>
          <Button mt="4" colorScheme="teal" onClick={handleDownload} size="sm">
            Download
          </Button>
        </Box>
      </Center>
      }
    </Flex>
  );
}

export default PluginDetailView;
