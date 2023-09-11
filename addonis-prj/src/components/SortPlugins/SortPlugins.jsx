import React from "react";
import { Button, Stack } from "@chakra-ui/react";

const SortPlugins = ({ handleSort }) => {
  return (
    <Stack direction="row" mb={4}>
      <Button onClick={() => handleSort("averageRating")} colorScheme="blue">
        Sort by Rating
      </Button>
      <Button onClick={() => handleSort("dateAdded")} colorScheme="teal">
        Sort by Date Added
      </Button>
      <Button onClick={() => handleSort("creator")} colorScheme="green">
        Sort by Creator
      </Button>
    </Stack>
  );
};

export default SortPlugins;
