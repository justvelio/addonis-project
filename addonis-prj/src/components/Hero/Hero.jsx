import React, { useState, useEffect, useRef } from "react";
import { Stack, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import ProductInfo from "../ProductInfo/ProductInfo";
import { ChevronDownIcon } from "@chakra-ui/icons";


function Hero() {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      const contentTop = contentRef.current.offsetTop;
      window.scrollTo({ top: contentTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const letters = document.querySelectorAll(".letter");
    letters.forEach((letter) => {
      const container = letter.closest(".gradient-text-container");
      const computedStyle = getComputedStyle(container);
      const backgroundColor = computedStyle.backgroundColor;
      letter.style.backgroundColor = backgroundColor;
    });
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <ImageCarousel />
        <div className="shadow-overlay" />
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
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl sm:text-center pb-8 text-slate-400">
                Where Home Meets <span className="italic">Tomorrow</span>
              </h1>
            </div>
            <Stack direction={"row"}>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={scrollToContent}
              >
                Learn More <ChevronDownIcon />
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </div>
      <div ref={contentRef}>
        <ProductInfo />
      </div>
    </>
  );
}

export default Hero;
