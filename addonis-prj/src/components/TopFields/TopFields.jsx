import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import TestAddon from "../TestAddons/TestAddons";
import TestAddon2 from "../TestAddons/TestAddons2";
import TestAddon3 from "../TestAddons/TestAddons3";

function TopFields({ children }) {
  return (
    <Tabs isFitted variant="enclosed" w="100%" color={"blackAlpha.800"}>
      <TabList mb="6em">
        <Tab
          _selected={{ color: "white", bg: "teal.200" }}
          _focus={{ outline: "none" }}
        >
          Featured
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "blue.300" }}
          _focus={{ outline: "none" }}
        >
          Popular
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "yellow.300" }}
          _focus={{ outline: "none" }}
        >
          New
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* Render your addons here */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)", // Update to 5 columns
              gap: "1em",
              alignItems: 'center',
              maxWidth: '100%',
              overflowX: 'auto' // Scroll horizontally if content overflows
            }}
          >
            <TestAddon3 />
            <TestAddon2 />
            <TestAddon />
            <TestAddon2 />
            <TestAddon3 />
            {/* Five addons in a row */}
          </div>
        </TabPanel>
        <TabPanel>
          {/* Render your addons here */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)", // Update to 5 columns
              gap: "1em",
              alignItems: 'center',
              maxWidth: '100%',
              overflowX: 'auto' // Scroll horizontally if content overflows
            }}
          >
            <TestAddon />
            <TestAddon2 />
            <TestAddon3 />
            <TestAddon2 />
            <TestAddon />
            {/* Five addons in a row */}
          </div>
        </TabPanel>
        <TabPanel>
          {/* Render your addons here */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)", // Update to 5 columns
              gap: "1em",
              alignItems: 'center',
              maxWidth: '100%',
              overflowX: 'auto' // Scroll horizontally if content overflows
            }}
          >
            <TestAddon />
            <TestAddon2 />
            <TestAddon3 />
            <TestAddon />
            <TestAddon2 />
            {/* Five addons in a row */}
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TopFields;
