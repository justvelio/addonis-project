import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";

export default function UploadedPlugins() {
  const [uploadedPlugins, setUploadedPlugins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pluginsPerPage = 12;

  useEffect(() => {
    const db = getDatabase();
    const pluginsRef = ref(db, "plugins");

    onValue(pluginsRef, (snapshot) => {
      const plugins = [];
      snapshot.forEach((childSnapshot) => {
        const plugin = childSnapshot.val();
        if (plugin.status === "pending") {
          plugins.push({ ...plugin, id: childSnapshot.key });
        }
      });
      setUploadedPlugins(plugins);
    });
  }, []);

  const indexOfLastPlugin = currentPage * pluginsPerPage;
  const indexOfFirstPlugin = indexOfLastPlugin - pluginsPerPage;
  const currentPlugins = uploadedPlugins.slice(
    indexOfFirstPlugin,
    indexOfLastPlugin
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = (pluginId) => {
    const db = getDatabase();
    update(ref(db, `plugins/${pluginId}`), { status: "approved" });

    setUploadedPlugins((prevPlugins) =>
      prevPlugins.filter((plugin) => plugin.id !== pluginId)
    );
  };

  const handleReject = (pluginId) => {
    const db = getDatabase();
    remove(ref(db, `plugins/${pluginId}`));

    setUploadedPlugins((prevPlugins) =>
      prevPlugins.filter((plugin) => plugin.id !== pluginId)
    );
  };

  return (
    <VStack spacing={4}>
      {uploadedPlugins.length === 0 ? (
        <Text>No pending plugins to be reviewed.</Text>
      ) : (
        <>
          <SimpleGrid columns={4} spacing={4}>
            {currentPlugins.map((plugin) => (
              <Flex
                key={plugin.id}
                borderWidth="1px"
                p={4}
                borderRadius="md"
                flexDirection="column"
              >
                <Text>Name: {plugin.name}</Text>
                <Text>Description: {plugin.description}</Text>
                <Text>Creator: {plugin.creator}</Text>
                <Text>Status: {plugin.status || "pending"}</Text>
                <HStack>
                  <Button
                    colorScheme="green"
                    onClick={() => handleApprove(plugin.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleReject(plugin.id)}
                  >
                    Reject
                  </Button>
                </HStack>
              </Flex>
            ))}
          </SimpleGrid>
          <Box>
            {uploadedPlugins.length > pluginsPerPage && (
              <HStack>
                {Array.from(
                  {
                    length: Math.ceil(uploadedPlugins.length / pluginsPerPage),
                  },
                  (_, i) => (
                    <Button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      variant={i + 1 === currentPage ? "solid" : "ghost"}
                    >
                      {i + 1}
                    </Button>
                  )
                )}
              </HStack>
            )}
          </Box>
        </>
      )}
    </VStack>
  );
}
