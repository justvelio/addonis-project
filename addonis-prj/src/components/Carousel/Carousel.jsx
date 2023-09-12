import PropTypes from 'prop-types';

import { useState, useRef } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Carousel = ({ children }) => {
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  const handlePrev = () => {
    if (scrollRef.current) {
      const newPos = Math.max(scrollPos - 300, 0);
      setScrollPos(newPos);
      scrollRef.current.scrollLeft = newPos;
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const newPos = Math.min(scrollPos + 300, scrollRef.current.scrollWidth);
      setScrollPos(newPos);
      scrollRef.current.scrollLeft = newPos;
    }
  };

  return (
    <Flex direction="row" alignItems="center" position="relative">
      <Button onClick={handlePrev} leftIcon={<ChevronLeftIcon />} m={2}>
        Prev
      </Button>
      <Box ref={scrollRef} overflowX="scroll" flex="1" whiteSpace="nowrap" p="0" m="0">
        {children}
      </Box>
      <Button onClick={handleNext} rightIcon={<ChevronRightIcon />} m={2}>
        Next
      </Button>
    </Flex>
  );
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carousel;