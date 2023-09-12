import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchGitHubData } from '../../utils/fetchGitHubData';
import { Box, Text, Button, Heading, Stack, Divider } from "@chakra-ui/react";
import StarDisplay from '../StarDisplay/StarDisplay';

export const PluginCard = ({ plugin }) => {
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
      h="100%"
      m="0"
    >
      <Stack mt="2" spacing="2" p="2" h={"15vh"}>
        <Heading size="md">{plugin.name}</Heading>
        <Text noOfLines={3}>{plugin.description}</Text>
        {/* <Text>Uploader: {plugin.firstName} {plugin.lastName}</Text> */}
        <Stack direction="row" align="center">
          <StarDisplay rating={plugin.averageRating || 0} />
          <Text>({totalReviews} reviews)</Text>
        </Stack>
      </Stack>
      <Divider />
      <Stack mt="1" spacing="2" p="2">
        <Text>Open Issues: {githubData.openIssues}</Text>
        <Text>Open Pull Requests: {githubData.pullRequests}</Text>
        <Text>
          Last Commit: {githubData.lastCommitDate ? new Date(githubData.lastCommitDate).toLocaleDateString() : 'N/A'}
          {githubData.lastCommitMessage && ` - ${githubData.lastCommitMessage}`}
        </Text>
      </Stack>
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
        <Button as={Link} to={`/plugin/${plugin.key}`} colorScheme="teal"> {/* changed to use plugin.key */}
          View More
        </Button>
      </Stack>
    </Box>
  );
};

PluginCard.propTypes = {
  plugin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    // creatorName: PropTypes.string.isRequired,
    image: PropTypes.string,
    key: PropTypes.string.isRequired,
    downloadUrl: PropTypes.string,
    githubRepoLink: PropTypes.string.isRequired,
    ratings: PropTypes.object,
    averageRating: PropTypes.number,
    gitDownloadLink: PropTypes.string.isRequired,
  }).isRequired,
  downloadUrl: PropTypes.string
};

export default PluginCard;