import { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../config/firebase-config";
import { getAuth } from "firebase/auth"; // Import getAuth

function MyPlugins() {
  const [plugins, setPlugins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("approved"); // Default to "approved"

  const auth = getAuth(); // Get Firebase Authentication instance
  const currentUser = auth.currentUser; // Get the current user

  useEffect(() => {
    if (!currentUser) {
      return; // Exit early if there's no authenticated user
    }

    const pluginsRef = ref(db, "plugins");

    onValue(pluginsRef, (snapshot) => {
      const plugins = [];
      snapshot.forEach((childSnapshot) => {
        const plugin = childSnapshot.val();
        if (plugin.creator === currentUser.uid) {
          // Filter plugins by the current user's UID
          plugins.push({ ...plugin, id: childSnapshot.key });
        }
      });
      setPlugins(plugins);
    });
  }, [currentUser]);

  const pluginsPerPage = 12;
  const indexOfLastPlugin = currentPage * pluginsPerPage;
  const indexOfFirstPlugin = indexOfLastPlugin - pluginsPerPage;
  const currentPlugins = plugins.slice(indexOfFirstPlugin, indexOfLastPlugin);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const approvedPlugins = plugins.filter(
    (plugin) => plugin.status === "approved"
  );

  const pendingPlugins = plugins.filter(
    (plugin) => plugin.status === "pending"
  );

  return (
    <VStack pt={20} spacing={4} h={"93vh"}>
      <Text fontSize="2xl" fontWeight="bold">
        Your Plugins
      </Text>
      <div className="min-w-[90%]">
      <Tabs
        mt="2rem"
        isFitted
        variant="enclosed-colored"
        onChange={(index) => {
          setSelectedTab(index === 0 ? "approved" : "pending");
        }}
      >
        <TabList>
          <Tab>Approved</Tab>
          <Tab>Pending</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={4} spacing={4}>
              {approvedPlugins.map((plugin) => (
                <Box
                  key={plugin.id}
                  borderWidth="1px"
                  p={4}
                  borderRadius="md"
                  flexDirection="column"
                >
                  <Text>Name: {plugin.name}</Text>
                  <Text>Description: {plugin.description}</Text>
                  <Text>Status: {plugin.status || "pending"}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={4} spacing={4}>
              {pendingPlugins.map((plugin) => (
                <Box
                  key={plugin.id}
                  borderWidth="1px"
                  p={4}
                  borderRadius="md"
                  flexDirection="column"
                >
                  <Text>Name: {plugin.name}</Text>
                  <Text>Description: {plugin.description}</Text>
                  <Text>Status: {plugin.status || "pending"}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </div>
      <Box>
        {plugins.length > pluginsPerPage && (
          <HStack>
            {Array.from(
              {
                length: Math.ceil(plugins.length / pluginsPerPage),
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
    </VStack>
  );
}

export default MyPlugins;
