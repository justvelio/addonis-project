import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
  } from "@chakra-ui/react";
  import UserList from "./UsersList";
import UploadedPlugins from "./UploadedPlugins";
  
  export default function AdminDashboard() {
    return (
      <Box pb={20} position="relative" width="100%" top="0">
        <Tabs isLazy>
          <TabList>
            <Tab>All Users</Tab>
            <Tab>Plugins Pending Approval</Tab>
          </TabList>
          <Box h="60vh">
            <TabPanels>
              <TabPanel>
                <UserList />
              </TabPanel>
              <TabPanel>
                <UploadedPlugins />
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
      </Box>
    );
  }
  