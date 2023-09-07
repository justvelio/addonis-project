import React, { useState } from "react";
import { Button, Tag, Box } from "@chakra-ui/react";

function DownloadPlugin() {
  const [pluginData, setPluginData] = useState({
    name: "Sample Plugin",
    description: "A sample plugin for testing",
    creator: "John Doe",
    tags: ["tag1", "tag2", "tag3"],
    gitDownloadLink: "https://github.com/sample/sample-plugin",
    originLink: "https://sample.com",
    numDownloads: 1000,
    rating: 4.5,
  });

  return (
    <Box>
      <h1>{pluginData.name}</h1>
      <p>{pluginData.description}</p>
      <p>Created by: {pluginData.creator}</p>
      <p>Number of Downloads: {pluginData.numDownloads}</p>
      <p>Rating: {pluginData.rating}</p>

      <Button colorScheme="teal" size="md">
        Download {pluginData.name}
      </Button>

      <Box>
        {pluginData.tags && pluginData.tags.map(tag => (
          <Tag key={tag} size="md" variant="solid" colorScheme="teal">
            {tag}
          </Tag>
        ))}
      </Box>
    </Box>
  );
}
export default DownloadPlugin;