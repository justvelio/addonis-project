import { Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";

function PluginDetailView({ plugin, onClose }) {

  const handleDownload = () => {

    const link = document.createElement('a');
    link.href = plugin.gitDownloadLink;
    link.download = '';
    link.click();
  };

  return (
    <VStack spacing={4} align="start" p={6} pt={20}>
      <HStack width="full" justify="space-between">
        <Heading size="2xl">{plugin.name}</Heading>
        <Button onClick={onClose} colorScheme="teal">Go Back</Button>
      </HStack>
      <Text fontSize="lg" color="gray.600">{plugin.description}</Text>
      <Button colorScheme="blue" onClick={handleDownload}>
        Download
      </Button>
    </VStack>
  );
}

export default PluginDetailView;