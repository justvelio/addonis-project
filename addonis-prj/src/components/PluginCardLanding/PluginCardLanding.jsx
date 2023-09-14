import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Text, Button, Heading, Stack, Divider } from "@chakra-ui/react";
import StarDisplay from "../StarDisplay/StarDisplay";
import { fetchGitHubData } from "../../utils/fetchGitHubData";
import { Link } from "react-router-dom";

export const PluginCardLanding = ({ plugin }) => {
  const [githubData, setGithubData] = useState({
    openIssues: 0,
    pullRequests: 0,
    lastCommitDate: null,
    lastCommitMessage: "",
  });
  const cardHeight = "60vh";

  useEffect(() => {
    if (plugin && plugin.githubRepoLink) {
      fetchGitHubData(plugin.githubRepoLink)
        .then((data) => {
          setGithubData(data);
        })
        .catch((error) => {
          console.error("Error fetching GitHub data:", error.message);
        });
    }
  }, [plugin]);

  const totalReviews = plugin.ratings ? Object.keys(plugin.ratings).length : 0;

  // console.log(plugin)

  return (
    <Box
      maxW="320px"
      bg={"white"}
      boxShadow={"2xl"}
      rounded={"sm"}
      p={6}
      textAlign={"center"}
      position="relative"
      h={cardHeight}
      display="flex"
      flexDirection="column" 
    >
      <Heading fontSize={"2xl"} fontFamily={"body"}>
        {plugin.name}
      </Heading>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        {/* Uploader: {plugin.firstName} {plugin.lastName} */}
      </Text>
      <Text noOfLines={3}>{plugin.description}</Text>
      <Stack mt={4} direction="row" align="center" justify="center">
        <StarDisplay rating={plugin.averageRating || 0} />
        <Text>({totalReviews} reviews)</Text>
      </Stack>
      <Divider mt={4} />
      <Stack mt={4} spacing={2}>
        <Text>Open Issues: {githubData.openIssues}</Text>
        <Text>Open Pull Requests: {githubData.pullRequests}</Text>
        <Text>
          Last Commit:{" "}
          {githubData.lastCommitDate
            ? new Date(githubData.lastCommitDate).toLocaleDateString()
            : "N/A"}
          {githubData.lastCommitMessage && ` - ${githubData.lastCommitMessage}`}
        </Text>
      </Stack>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p={4}
        bg={"white"}
        borderTopWidth="1px"
        textAlign="center"
      >
        <Button
          as="a"
          href={plugin.gitDownloadLink}
          download
          type="application/octet-stream"
          colorScheme="blue"
          variant="solid"
          fontSize={"sm"}
          rounded={"md"}
          _focus={{
            bg: "gray.200",
          }}
          marginRight="8px"
        >
          Download Now
        </Button>
        <Button as={Link} to={`/plugin/${plugin.name}`} colorScheme="teal">
          View More
        </Button>
      </Box>
    </Box>
  );
};

PluginCardLanding.propTypes = {
  plugin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    key: PropTypes.string.isRequired,
    githubRepoLink: PropTypes.string.isRequired,
    ratings: PropTypes.object,
    averageRating: PropTypes.number,
    gitDownloadLink: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  downloadUrl: PropTypes.string,
};

export default PluginCardLanding;
