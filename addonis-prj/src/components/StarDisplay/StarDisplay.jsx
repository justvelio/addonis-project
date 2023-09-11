import { StarIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const StarDisplay = ({ rating }) => {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => (
          <StarIcon
            key={i}
            color={i < rating ? 'teal.500' : 'gray.300'}
          />
        ))}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {rating.toFixed(1)} / 5
      </Box>
    </Box>
  );
};

export default StarDisplay;