import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Text, Button, Heading, Stack, Divider, Wrap, Flex, Tag } from "@chakra-ui/react";
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

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      h="450px"
      bgColor={'whiteAlpha.600'}
    >
      <Flex flexDirection="column" justifyContent="space-between" h="100%">
        <Box>
          <Stack mt="2" spacing="2" p="2">
            <Heading size="md" noOfLines={1}>
              {plugin.name}
            </Heading>
            <Text noOfLines={2}>
              {plugin.description}
            </Text>



            <Wrap spacing="1" mt="1">
              {plugin.tags && plugin.tags.slice(0, 4).map((tag) => (
                <Tag key={tag} colorScheme="teal" size="sm">
                  {tag}
                </Tag>
              ))}
            </Wrap>

            <Stack direction="row" align="center" mt="1">
              <StarDisplay rating={plugin.averageRating || 0} />
              <Text>({totalReviews} reviews)</Text>
            </Stack>
          </Stack>
          <Divider />
          <Stack mt="1" spacing="2" p="2">
            <Text noOfLines={1}>Open Issues: {githubData.openIssues}</Text>
            <Text noOfLines={1}>Open Pull Requests: {githubData.pullRequests}</Text>
            <Text noOfLines={1}>
              Last Commit:{" "}
              {new Date(githubData.lastCommitDate).toLocaleDateString()}
              {githubData.lastCommitMessage && ` - ${githubData.lastCommitMessage}`}
            </Text>
          </Stack>
        </Box>

        <Stack mt="1" p="4">
          <Button
            as="a"
            href={plugin.gitDownloadLink}
            download
            type="application/octet-stream"
            colorScheme="blue"
            variant="solid"
          >
            Download Now
          </Button>
          <Button as={Link} to={`/plugin/${plugin.id}`} colorScheme="teal">
            View More
          </Button>
        </Stack>
      </Flex>
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
