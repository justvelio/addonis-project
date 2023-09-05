import React, { useState, useEffect, useRef } from "react";
import { Stack, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { ChevronDownIcon } from "@chakra-ui/icons";
import './Hero.css'
import TopFields from "../TopFields/TopFields";
import PluginList from "../PluginList/PluginList";


function Hero() {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      const contentTop = contentRef.current.offsetTop;
      window.scrollTo({ top: contentTop, behavior: "smooth" });
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        
        <ImageCarousel />
        <VStack
          w={"full"}
          h={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, transparent)"}
          position="absolute"
          top="0"
          left="0"
        >
          <Stack maxW={"4xl"} align={"flex-start"} spacing={6}>
            <Stack direction={"row"} pb={12}>
              <Button
                className="btn"
                onClick={scrollToContent}
              >
                Learn More <ChevronDownIcon />
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </div>
      <div ref={contentRef}>
      </div>
    </>
  );
}

export default Hero;
