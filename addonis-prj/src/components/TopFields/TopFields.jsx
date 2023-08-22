import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import TestAddon from '../TestAddons/TestAddons';
import TestAddon2 from '../TestAddons/TestAddons2';
import TestAddon3 from '../TestAddons/TestAddons3';

function TopWrapper({ children }) {
  return (
    <Tabs isFitted variant='enclosed' w={96} color={'whiteAlpha.400'}>
      <TabList mb='6em'>
        <Tab
          _selected={{ color: 'white', bg: 'blue.800' }}
          _focus={{ outline: 'none' }}>
          Featured
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'blue.800' }}
          _focus={{ outline: 'none' }}>
          Popular
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'blue.800' }}
          _focus={{ outline: 'none' }}>
          New
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TestAddon />
        </TabPanel>
        <TabPanel>
          <TestAddon2 />
        </TabPanel>
        <TabPanel>
          <TestAddon3 />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TopWrapper;
