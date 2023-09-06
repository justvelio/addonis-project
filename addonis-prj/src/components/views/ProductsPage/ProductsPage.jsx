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

const ProductCard = ({ plugin, downloadUrl }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      h="100%"
    >
      {/* <Image
        src={plugin.image}
        alt={plugin.name}
        borderRadius="lg"
        maxH="200px"
        objectFit="cover"
      /> */}
      <Stack mt="2" spacing="2" p="2" h={"15vh"}>
        <Heading size="md">{plugin.name}</Heading>
        <Text noOfLines={3}>{plugin.description}</Text>
        <Text>Uploader: {plugin.creatorName}</Text>
      </Stack>
      <Divider />
      <Stack mt="1" p="4">
        <Button as="a" href={downloadUrl} colorScheme="blue" variant="solid">
          Download Now
        </Button>
      </Stack>
    </Box>
  );
};

ProductCard.propTypes = {
  plugin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    creatorName: PropTypes.string.isRequired,
    image: PropTypes.string,
    id: PropTypes.string.isRequired,
    downloadUrl: PropTypes.string,
  }).isRequired,
};

const ProductsPage = () => {
  const [plugins, setPlugins] = useState([]);

  const fetchUserData = async (plugin) => {
    try {
      const userRef = ref(db, `users/${plugin.creator}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const user = userSnapshot.val();
        return {
          ...plugin,
          creatorName: `${user.firstName} ${user.lastName}`,
        };
      } else {
        return plugin;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return plugin;
    }
  };

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        const pluginsRef = ref(db, "plugins");
        const snapshot = await get(pluginsRef);
        if (snapshot.exists()) {
          const pluginsData = await Promise.all(
            Object.values(snapshot.val()).map(
              async (plugin, index) =>
                await fetchUserData({
                  ...plugin,
                  id: Object.keys(snapshot.val())[index],
                })
            )
          );
          setPlugins(pluginsData);
        } else {
          console.log("No plugin data available");
        }
      } catch (error) {
        console.error("Error fetching plugins:", error);
      }
    };

    fetchPlugins();
  }, []);

  return (
    <Box p={20} h={"93vh"}>
      <Heading as="h1" mb={4}>
        Products
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {plugins.map((plugin) => (
          <ProductCard
            key={plugin.id}
            plugin={plugin}
            downloadUrl={plugin.downloadUrl}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductsPage;
