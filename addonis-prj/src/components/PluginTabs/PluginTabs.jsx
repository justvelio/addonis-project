import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PluginList from "../PluginList/PluginList";

function PluginTabs({ plugins }) {
  return (
    <Tabs>
      <TabList>
        <Tab>Top</Tab>
        <Tab>Featured</Tab>
        <Tab>Newest</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {/* This is where Top will go once it has been impelemented */}
        </TabPanel>
        <TabPanel>
          <PluginList plugins={plugins.filter(plugin => plugin.featured === true)} />
        </TabPanel>
        <TabPanel>
          <PluginList plugins={plugins.filter(plugin => plugin.status === "approved")} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default PluginTabs;