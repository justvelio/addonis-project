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
  Divider,
} from "@chakra-ui/react";
import { ref, get } from "firebase/database";
import { db } from "../../../config/firebase-config";
import { fetchGitHubData } from "../../../utils/fetchGitHubData";
import { calculateAverageRating } from "../../../utils/calculateAverageRating";
import StarDisplay from "../../StarDisplay/StarDisplay";
import SearchBar from "../../Search/Search";
import SortPlugins from "../../SortPlugins/SortPlugins";

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
          Last Commit: {new Date(githubData.lastCommitDate).toLocaleDateString()}
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
        <Button as={Link} to={`/plugin/${plugin.id}`} colorScheme="teal">
          View More
        </Button>
      </Stack>
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

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return;
    }
    setSearchQuery(searchQuery);
  };

  const handleSort = (criteria) => {
    const sorted = [...filteredPlugins];

    if (criteria === "averageRating") {
      sorted.sort((a, b) => b.averageRating - a.averageRating);
    } else if (criteria === "dateAdded") {
      sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else if (criteria === "creator") {
      sorted.sort((a, b) =>
        a.creatorName.localeCompare(b.creatorName, undefined, {
          sensitivity: "base",
        })
      );
    }

    setFilteredPlugins(sorted);
  };

  useEffect(() => {
    const filtered = plugins.filter((plugin) =>
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlugins(filtered);
  }, [searchQuery, plugins]);

  useEffect(() => {
    const fetchPlugins = async () => {
      const pluginsRef = ref(db, "plugins");
      const snapshot = await get(pluginsRef);
      const fetchedPlugins = await Promise.all(
        Object.values(snapshot.val()).map(async (plugin, index) => {
          const timestamp = new Date(plugin.date).getTime();
          return await fetchUserData({
            ...plugin,
            id: Object.keys(snapshot.val())[index],
            timestamp: timestamp,
          });
        })
      );

      fetchedPlugins.forEach((plugin) => {
        if (plugin.ratings) {
          plugin.averageRating = calculateAverageRating(plugin.ratings);
        } else {
          plugin.averageRating = 0;
        }
      });

      const sortedPluginsByDate = fetchedPlugins.sort(
        (a, b) => b.timestamp - a.timestamp
      );

      setPlugins(sortedPluginsByDate);
    };
    fetchPlugins();
  }, []);


  return (
    <Box minHeight="100vh" p={20} display="flex" flexDir="column">
      <Heading as="h1" mb={4}>
        Products
      </Heading>
      <SortPlugins handleSort={handleSort} />
      <SearchBar setSearchQuery={setSearchQuery} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} flex="1">
        {filteredPlugins
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
