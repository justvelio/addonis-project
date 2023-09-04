import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
  } from "@chakra-ui/react";
  import UserList from "./UsersList";
  
  export default function AdminDashboard() {
    return (
      <Box pb={20} position="relative" width="100%" top="0">
        <Tabs isLazy>
          <TabList>
            <Tab>All Users</Tab>
            <Tab>Blocked Users</Tab>
            <Tab>Uploaded Plugins</Tab>
          </TabList>
          <Box h="60vh">
            <TabPanels>
              <TabPanel>
                <UserList />
              </TabPanel>
              <TabPanel>
                all blocked users will be stored here
              </TabPanel>
              <TabPanel>
                uploaded plugins will come here to be accepted by admin
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
      </Box>
    );
  }
  