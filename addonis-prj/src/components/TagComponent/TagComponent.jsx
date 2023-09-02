import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, Select } from "@chakra-ui/react";

function TagComponent({ mode, allTags, selectedTags, onTagChange }) {
  const [selectedTag, setSelectedTag] = useState("");

  const handleSelectChange = (event) => {
    setSelectedTag(event.target.value);
    if (mode === "edit" && event.target.value) {
      onTagChange([...selectedTags, event.target.value]);
    }
  };

  const handleCheckboxChange = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  return (
    <Box>
      {mode === "edit" && (
        <Select value={selectedTag} onChange={handleSelectChange} placeholder="Select a tag">
          {allTags.map((tag) => (
            !selectedTags.includes(tag) && <option key={tag} value={tag}>{tag}</option>
          ))}
        </Select>
      )}

      {selectedTags.map((tag) => (
        <Box key={tag} d="flex" alignItems="center" m={1}>
          {mode === "edit" && <Checkbox isChecked={selectedTags.includes(tag)} onChange={() => handleCheckboxChange(tag)} />}
          <Box mx={2}>{tag}</Box>
        </Box>
      ))}
    </Box>
  );
}

TagComponent.propTypes = {
  mode: PropTypes.oneOf(['edit', 'display']).isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagChange: PropTypes.func
};

TagComponent.defaultProps = {
  onTagChange: () => { }
};

export default TagComponent;