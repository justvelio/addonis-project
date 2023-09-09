import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PluginList from "../PluginList/PluginList";
import { calculateAverageRating } from "../../utils/calculateAverageRating";

function PluginTabs({ plugins }) {

  const topRatedPlugins = plugins
    .filter(plugin => plugin.ratings && Object.keys(plugin.ratings).length > 0)
    .sort((a, b) =>
      calculateAverageRating(b.ratings) - calculateAverageRating(a.ratings)
    );

  return (
    <Tabs>
      <TabList>
        <Tab>Top</Tab>
        <Tab>Featured</Tab>
        <Tab>Newest</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PluginList plugins={topRatedPlugins} />
        </TabPanel>
        <TabPanel>
          <PluginList plugins={plugins.filter(plugin => plugin.featured === true)} />
        </TabPanel>
        <TabPanel>
          <PluginList plugins={plugins.filter(plugin => plugin.status === "approved").sort((a, b) => new Date(b.date) - new Date(a.date))} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}


export default PluginTabs;