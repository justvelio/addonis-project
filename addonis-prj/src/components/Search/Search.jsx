import React, { useState } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ setSearchQuery, handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    setSearchQuery(query);
    handleSearch();
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      pb={4}
      spacing={2}
    >
      <Input
        type="text"
        placeholder="Search plugins"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleEnterKey}
        w={{ base: "100%", md: "300px" }}
        mb={{ base: 2, md: 0 }}
      />
      <Button
        colorScheme="blue"
        leftIcon={<SearchIcon />}
        onClick={handleSubmit}
        w={{ base: "100%", md: "auto" }}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
