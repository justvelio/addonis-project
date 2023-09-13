import React from "react";
import { Button, Flex } from "@chakra-ui/react";

const SortPlugins = ({ handleSort }) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems="flex-start"
      mb={4}
    >
      <Button
        onClick={() => handleSort("averageRating")}
        colorScheme="blue"
        mb={{ base: 2, md: 0 }}
        mr={{ base: 0, md: 2 }}
      >
        Sort by Rating
      </Button>
      <Button
        onClick={() => handleSort("dateAdded")}
        colorScheme="teal"
        mb={{ base: 2, md: 0 }}
        mr={{ base: 0, md: 2 }}
      >
        Sort by Date Added
      </Button>
      <Button
        onClick={() => handleSort("creator")}
        colorScheme="green"
        mb={{ base: 2, md: 0 }}
      >
        Sort by Creator
      </Button>
    </Flex>
  );
};

export default SortPlugins;
