import React from 'react';
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoFlaskSharp, IoEyeOff, IoFishSharp } from 'react-icons/io5';
import { color } from 'framer-motion';
import animationData from '../../assets/animation_llnwfv8u.json'
import Lottie from 'lottie-react'

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600} color={'gray'}>{text}</Text>
    </Stack>
  );
};

export default function ProductInfo() {

    
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Heading color={'gray'} textAlign={'center'}>🏡 Your Home, Upgraded</Heading>

          <Text color={'gray'} fontSize={'lg'} textAlign={'center'}>
          Embrace the future with our handpicked selection of addons designed to elevate your home's IQ. Experience the convenience of automation, the thrill of futuristic tech, and the comfort of a truly intelligent living space.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoFlaskSharp} color={'gry.500'} w={5} h={5} />}
              iconBg={useColorModeValue('gray', 'grey.900')}
              text={'Effortless Automation'}
            />
            <Feature
              icon={<Icon as={IoEyeOff} color={'gry.500'} w={5} h={5} />}
              iconBg={useColorModeValue('gray', 'grey.900')}
              text={'Boundless Futuristic Thrills'}
            />
            <Feature
              icon={<Icon as={IoFishSharp} color={'grey.500'} w={5} h={5} />}
              iconBg={useColorModeValue('gray', 'grey.900')}
              text={'Intelligence that Cares'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Lottie animationData = {animationData} />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
