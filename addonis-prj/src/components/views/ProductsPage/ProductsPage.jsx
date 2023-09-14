import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Button,
  Flex,
  Divider,
  Tag,
  Wrap,
  useBreakpointValue
} from "@chakra-ui/react";
import { ref, get } from "firebase/database";
import { db } from "../../../config/firebase-config";
import { fetchGitHubData } from "../../../utils/fetchGitHubData";
import { calculateAverageRating } from "../../../utils/calculateAverageRating";
import StarDisplay from "../../StarDisplay/StarDisplay";
import SearchBar from "../../Search/Search";
import SortPlugins from "../../SortPlugins/SortPlugins";
import { incrementDownloadCount } from "../../../utils/firebaseHelpers";

export const PluginCard = ({ plugin }) => {
  const [githubData, setGithubData] = useState({
    openIssues: 0,
    pullRequests: 0,
    lastCommitDate: null,
    lastCommitMessage: "",
  });

  useEffect(() => {
    fetchGitHubData(plugin.githubRepoLink)
      .then((data) => {
        setGithubData(data);
      })
      .catch((error) => {
        console.error("Error fetching GitHub data:", error.message);
      });
  }, [plugin.githubRepoLink]);

  const totalReviews = plugin.ratings ? Object.keys(plugin.ratings).length : 0;

  const handleDownloadClick = async () => {
    try {
      await incrementDownloadCount(plugin.id);
    } catch (error) {
      console.error("Error updating download count:", error.message);
    }
  };

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
            <Heading size="md" noOfLines={1}>{plugin.name}</Heading>
            <Text noOfLines={2}>{plugin.description}</Text>
            <Text noOfLines={1}>Uploader: {plugin.creatorName}</Text>
            <Wrap spacing="1" mt="1">
              {plugin.tags && plugin.tags.slice(0, 4).map((tag) => (
                <Tag key={tag} colorScheme="teal" size="sm">{tag}</Tag>
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
              Last Commit: {new Date(githubData.lastCommitDate).toLocaleDateString()} {githubData.lastCommitMessage && ` - ${githubData.lastCommitMessage}`}
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
            onClick={handleDownloadClick}
          >
            Download Now
          </Button>
          <Text noOfLines={1}>Downloads: {plugin.downloadCount || 0}</Text>
          <Button as={Link} to={`/plugin/${plugin.id}`} colorScheme="teal">View More</Button>
        </Stack>
      </Flex>
    </Box>
  );
};

PluginCard.propTypes = {
  plugin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    creatorName: PropTypes.string.isRequired,
    image: PropTypes.string,
    id: PropTypes.string.isRequired,
    downloadUrl: PropTypes.string,
    githubRepoLink: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    ratings: PropTypes.object,
    averageRating: PropTypes.number,
    gitDownloadLink: PropTypes.string.isRequired,
  }).isRequired,
};

const ProductsPage = () => {
  const [plugins, setPlugins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlugins, setFilteredPlugins] = useState(plugins);

  const fetchUserData = async (plugin) => {
    const userRef = ref(db, `users/${plugin.creator}`);
    const userSnapshot = await get(userRef);
    const user = userSnapshot.exists() ? userSnapshot.val() : {};
    return {
      ...plugin,
      creatorName: `${user.firstName} ${user.lastName}`,
    };
  };

  const handleSort = (criteria) => {
    const sorted = [...filteredPlugins];

    if (criteria === "averageRating") {
      sorted.sort((a, b) => b.averageRating - a.averageRating);
    } else if (criteria === "dateAdded") {
      sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else if (criteria === "creator") {
      sorted.sort((a, b) => a.creatorName.localeCompare(b.creatorName, undefined, { sensitivity: "base" }));
    }

    setFilteredPlugins(sorted);
  };

  useEffect(() => {
    const filtered = plugins.filter((plugin) => plugin.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPlugins(filtered);
  }, [searchQuery, plugins]);

  useEffect(() => {
    const fetchPlugins = async () => {
      const pluginsRef = ref(db, "plugins");
      const snapshot = await get(pluginsRef);
      const fetchedPlugins = await Promise.all(
        Object.values(snapshot.val()).map(async (plugin, index) => {
          const timestamp = new Date(plugin.dateAdded).getTime();
          const withUserData = await fetchUserData({ ...plugin, id: `plugin${index}`, timestamp });
          return withUserData;
        })
      );

      fetchedPlugins.forEach((plugin) => {
        if (plugin.ratings) {
          plugin.averageRating = calculateAverageRating(plugin.ratings);
        } else {
          plugin.averageRating = 0;
        }
        plugin.downloadCount = plugin.downloadCount || 0;
      });

      setPlugins(fetchedPlugins);
    };

    fetchPlugins();
  }, []);

  return (
    <Box>
      <Box textAlign="center" my="4">
        <Heading size="xl">Browse Addonis Plugins</Heading>
        <Text mt="2">Search, sort, and find the plugins you need!</Text>
      </Box>
      <SearchBar onChange={(e) => setSearchQuery(e.target.value)} />
      <SortPlugins onSort={handleSort} />
      <SimpleGrid columns={useBreakpointValue({ base: 1, md: 2, lg: 3 })} gap="6" mt="6">
        {filteredPlugins
          .filter((plugin) => plugin.status === "approved" && plugin.githubRepoLink)
          .map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductsPage;