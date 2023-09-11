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
    if (e.key === 'Enter'){
      handleSubmit();
    }
  }

  return (
    <Stack direction="row" pb={10} spacing={2}>
      <Input
        type="text"
        placeholder="Search plugins"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleEnterKey}
      />
      <Button
        colorScheme="blue"
        leftIcon={<SearchIcon />}
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
