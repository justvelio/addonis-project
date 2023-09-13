import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

export default function FeaturedPlugins() {
  const [allPlugins, setAllPlugins] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const pluginsRef = ref(db, "plugins");

    onValue(pluginsRef, (snapshot) => {
      const plugins = [];
      snapshot.forEach((childSnapshot) => {
        const plugin = childSnapshot.val();
        if (plugin.status === "approved") {
          plugins.push({ ...plugin, id: childSnapshot.key });
        }
      });
      setAllPlugins(plugins);
    });
  }, []);

  const handleFeature = async (pluginId, isFeatured) => {
    const db = getDatabase();
    try {
      await update(ref(db, `plugins/${pluginId}`), { featured: !isFeatured });
      setAllPlugins((prevPlugins) =>
        prevPlugins.map((plugin) =>
          plugin.id === pluginId ? { ...plugin, featured: !isFeatured } : plugin
        )
      );
    } catch (error) {
      console.error("Error setting the featured status:", error);
    }
  };

  const handleDelete = async (pluginId) => {
    const db = getDatabase();
    try {
      await remove(ref(db, `plugins/${pluginId}`));
      setAllPlugins((prevPlugins) =>
        prevPlugins.filter(plugin => plugin.id !== pluginId)
      );
    } catch (error) {
      console.error("Error deleting the plugin:", error);
    }
  };

  return (
    <VStack spacing={4}>
      {allPlugins.length === 0 ? (
        <Text>No plugins available.</Text>
      ) : (
        <SimpleGrid columns={4} spacing={4}>
          {allPlugins.map((plugin) => (
            <Box
              key={plugin.id}
              bgColor={'whiteAlpha.600'}
              borderWidth="1px"
              p={4}
              borderRadius="md"
              flexDirection="column"
            >
              <Text>Name: {plugin.name}</Text>
              <Text>Description: {plugin.description}</Text>
              <HStack spacing={2}>
                <Button
                  colorScheme={plugin.featured ? "yellow" : "gray"}
                  onClick={() => handleFeature(plugin.id, plugin.featured)}
                >
                  {plugin.featured ? "Unfeature" : "Feature"}
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(plugin.id)}
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}