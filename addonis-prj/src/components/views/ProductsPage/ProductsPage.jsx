import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ref, get } from "firebase/database";
import { db } from "../../../config/firebase-config";
import { fetchGitHubData } from "../../../utils/fetchGitHubData";

export const PluginCard = ({ plugin, downloadUrl }) => {
  const [githubData, setGithubData] = useState({
    openIssues: 0,
    pullRequests: 0,
    lastCommitDate: null,
    lastCommitMessage: "",
  });

  useEffect(() => {
    fetchGitHubData(plugin.githubRepoLink)
      .then((data) => {
        console.log('GitHub Data:', data);
        setGithubData(data);
      })
      .catch((error) => {
        console.error("Error fetching GitHub data:", error.message);
      });
  }, [plugin.githubRepoLink]);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      h="100%"
    >
      <Stack mt="2" spacing="2" p="2" h={"15vh"}>
        <Heading size="md">{plugin.name}</Heading>
        <Text noOfLines={3}>{plugin.description}</Text>
        <Text>Uploader: {plugin.creatorName}</Text>
      </Stack>
      <Divider />
      <Stack mt="1" spacing="2" p="2">
        <Text>Open Issues: {githubData.openIssues}</Text>
        <Text>Open Pull Requests: {githubData.pullRequests}</Text>
        <Text>
          Last Commit: {new Date(githubData.lastCommitDate).toLocaleDateString()}
          {githubData.lastCommitMessage && ` - ${githubData.lastCommitMessage}`}
        </Text>
      </Stack>
      <Stack mt="1" p="4">
        <Button as="a" href={downloadUrl} colorScheme="blue" variant="solid">
          Download Now
        </Button>
      </Stack>
    </Box>
  );
}

PluginCard.propTypes = {
  plugin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    creatorName: PropTypes.string.isRequired,
    image: PropTypes.string,
    id: PropTypes.string.isRequired,
    downloadUrl: PropTypes.string,
    githubRepoLink: PropTypes.string.isRequired,
  }).isRequired,
};



const ProductsPage = () => {
  const [plugins, setPlugins] = useState([]);

  const fetchUserData = async (plugin) => {
    const userRef = ref(db, `users/${plugin.creator}`);
    const userSnapshot = await get(userRef);
    const user = userSnapshot.exists() ? userSnapshot.val() : {};
    return {
      ...plugin,
      creatorName: `${user.firstName} ${user.lastName}`,
    };
  };

  useEffect(() => {
    const fetchPlugins = async () => {
      const pluginsRef = ref(db, "plugins");
      const snapshot = await get(pluginsRef);
      const pluginsData = await Promise.all(
        Object.values(snapshot.val()).map(async (plugin, index) => {
          return await fetchUserData({
            ...plugin,
            id: Object.keys(snapshot.val())[index],
          });
        })
      );
      setPlugins(pluginsData);
    };
    fetchPlugins();
  }, []);

  return (
    <Box p={20} h={"93vh"}>
      <Heading as="h1" mb={4}>
        Products
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {plugins
          .filter(
            (plugin) => plugin.status === "approved" && plugin.githubRepoLink
          )
          .map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              downloadUrl={plugin.downloadUrl}
              status={plugin.status}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductsPage;
