import { useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import AddonCards from "../AddonCards/AddonCards";
import TestAddon2 from "../AddonCards/TestAddons2";
import TestAddon3 from "../AddonCards/TestAddons3";
import AddonsList from "../AddonsList/AddonsList";

function TopFields() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabTexts = ["Featured", "Most Popular", "Newest"];

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <>
      <h2 className="mt-10 text-4xl font-bold tracking-tight text-center text-slate-800 sm:text-6xl pb-12">
        Check Out Some Of Our {tabTexts[selectedTab]} Addons
      </h2>
      <Tabs
        isFitted
        variant="enclosed"
        w="100%"
        color={"blackAlpha.800"}
        onChange={handleTabChange}
      >
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)", 
                gap: "1em",
                alignItems: "center",
                maxWidth: "100%",
                overflowX: "auto", 
              }}
            >
              <TestAddon3 />
              <TestAddon2 />
              <AddonsList />
              <TestAddon2 />
              <TestAddon3 />

            </div>
          </TabPanel>
          <TabPanel>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1em",
                alignItems: "center",
                maxWidth: "100%",
                overflowX: "auto",
              }}
            >
    
              <TestAddon2 />
              <TestAddon3 />
              <TestAddon2 />
            

            </div>
          </TabPanel>
          <TabPanel>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)", 
                gap: "1em",
                alignItems: "center",
                maxWidth: "100%",
                overflowX: "auto", 
              }}
            >
             
              <TestAddon2 />
              <TestAddon3 />
          
              <TestAddon2 />

            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default TopFields;
