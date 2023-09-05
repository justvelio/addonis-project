import PropTypes from 'prop-types';

import { Box, Text, Button, Heading, VStack, HStack, Link, Badge } from "@chakra-ui/react";

function PluginCard({ plugin, onClick, onDownload }) {
  return (
    <Box
      width="260px"
      height="380px"
      border="1px"
      borderRadius="lg"
      padding="4"
      mb="1"
      mr="1"
      onClick={onClick}
      boxShadow="md"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
      transition="all 0.2s"
      bgGradient="linear(to-b, gray.50, gray.100)"
      overflow="hidden"
    >
      <VStack spacing={3} alignItems="start" justifyContent="space-between" height="100%">
        <VStack spacing={2} alignItems="start">
          <Heading size="md">{plugin.name}</Heading>
          <Text noOfLines={3}>{plugin.description}</Text>

          {plugin.category && <Badge colorScheme="blue">{plugin.category}</Badge>}

          <HStack spacing={4}>
            {plugin.rating && (
              <HStack spacing={2}>
                <Text color="gray.500">Rating: {plugin.rating} / 5</Text>
              </HStack>
            )}
            {plugin.reviewsCount && <Text color="gray.600">{plugin.reviewsCount} reviews</Text>}
          </HStack>
        </VStack>
        <HStack spacing={4} width="100%">
          <Button
            flex={1}
            size="sm"
            colorScheme="blue"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </Button>

          <Link
            as="a"
            href={plugin.gitDownloadLink}
            download
            flex={1}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button size="sm" colorScheme="green" width="full">
              Download
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

PluginCard.propTypes = {
  plugin: PropTypes.shape({
    gitDownloadLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    rating: PropTypes.number,
    category: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  onDownload: PropTypes.func
};

export default PluginCard;