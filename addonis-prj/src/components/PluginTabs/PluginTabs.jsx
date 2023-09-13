import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import PluginList from "../PluginList/PluginList";
import { calculateAverageRating } from "../../utils/calculateAverageRating";

function PluginTabs({ plugins }) {
  const topRatedPlugins = plugins
    .filter(plugin => plugin.ratings && Object.keys(plugin.ratings).length > 0)
    .sort((a, b) =>
      calculateAverageRating(b.ratings) - calculateAverageRating(a.ratings)
    );

  return (
    <Tabs isFitted variant='enclosed' bgColor={'white'}>
      <TabList mb='1em'>
        <Tab fontWeight={'bold'}>Top</Tab>
        <Tab fontWeight={'bold'}>Featured</Tab>
        <Tab fontWeight={'bold'}>Newest</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PluginList plugins={topRatedPlugins.slice(0, 6)} />
        </TabPanel>
        <TabPanel>
          <PluginList plugins={plugins.filter(plugin => plugin.featured === true).slice(0, 6)} />
        </TabPanel>
        <TabPanel>
          <PluginList plugins={plugins.filter(plugin => plugin.status === "approved").sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default PluginTabs;
