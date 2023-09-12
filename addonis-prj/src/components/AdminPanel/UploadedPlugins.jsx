import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";

export default function UploadedPlugins() {
  const [uploadedPlugins, setUploadedPlugins] = useState([]);
  const [users, setUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pluginsPerPage = 12;
  const toast = useToast();

  useEffect(() => {
    const db = getDatabase();
    const pluginsRef = ref(db, "plugins");
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      setUsers(usersData);
    });

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

  const handleApprove = async (pluginId) => {
    const db = getDatabase();
    try {
      await update(ref(db, `plugins/${pluginId}`), { status: "approved" });
      setUploadedPlugins((prevPlugins) =>
        prevPlugins.filter((plugin) => plugin.id !== pluginId)
      );
      toast({
        title: "Plugin Approved.",
        description: "The plugin has been approved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error approving the plugin.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (pluginId) => {
    const db = getDatabase();
    try {
      await remove(ref(db, `plugins/${pluginId}`));
      setUploadedPlugins((prevPlugins) =>
        prevPlugins.filter((plugin) => plugin.id !== pluginId)
      );
      toast({
        title: "Plugin Rejected.",
        description: "The plugin has been rejected and removed.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error rejecting the plugin.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
                <Text>
                  Creator:
                  {users[plugin.creator]
                    ? `${users[plugin.creator].firstName} ${users[plugin.creator].lastName}`
                    : plugin.creator
                  }
                </Text>
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