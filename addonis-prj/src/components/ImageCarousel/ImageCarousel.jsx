import React, { useState } from 'react';
import {
  Box,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import Slider from 'react-slick';

// Import slick.css and slick-theme.css styles directly in JSX
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const imageTexts = [
  "Discover a World of Possibilities",
  "Explore Innovative Smart Home Solutions",
  "Transform Your Living Space",
  "Experience the Future of Home Automation",
  "Elevate Your Lifestyle with Smart Technology",
  "Connect, Control, and Create with FutureHome",
];

export default function ImageCarousel() {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const images = [
    "https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2113&q=80",
    "https://images.unsplash.com/photo-1606744888344-493238951221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1606744824163-985d376605aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    'https://images.unsplash.com/photo-1612965607446-25e1332775ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1611094016919-36b65678f3d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  return (
    <Box>
      <Box position={'relative'} height={'100vh'} width={'full'} overflow={'hidden'}>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {images.map((url, index) => (
            <Box
              key={index}
              height={'6xl'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
            >
              <Text
         
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="lightgray"
                textShadow={'5px 4px black'}
                fontSize={{ base: "xl", md: "4xl" }}
                textAlign="center"
                fontWeight={'bold'}
              >
                {imageTexts[index]}
              </Text>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
