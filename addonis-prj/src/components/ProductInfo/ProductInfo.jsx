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
import animationData from '../../assets/animation_brain.json'
import Lottie from 'lottie-react'
import { useRef } from 'react';

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600} color={'white'}>{text}</Text>
    </Stack>
  );
};

export default function ProductInfo() {
    const brainAnim = useRef()

    
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Heading color={'white'} textAlign={'center'}>🧠Upgrade Your Mind with our Addon Registry!🧠</Heading>
          <Text color={'white'} fontSize={'lg'} textAlign={'center'}>🔥Experience the Future of Brain Enhancement🔥</Text>
          <Text color={'white'} fontSize={'lg'} textAlign={'center'}>
          Imagine having the ability to enhance memory, creativity, and problem-solving skills with just a few clicks. Our addon collection boasts a wide range of brain-boosting tools designed to expand your mental horizons.
          </Text>
          <Text color={'white'} fontSize={'lg'} textAlign={'center'}>Why choose us?</Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoFlaskSharp} color={'gry.500'} w={5} h={5} />}
              iconBg={useColorModeValue('white', 'grey.900')}
              text={'Scientifically Backed'}
            />
            <Feature
              icon={<Icon as={IoEyeOff} color={'gry.500'} w={5} h={5} />}
              iconBg={useColorModeValue('white', 'grey.900')}
              text={'Privacy and Security'}
            />
            <Feature
              icon={<Icon as={IoFishSharp} color={'grey.500'} w={5} h={5} />}
              iconBg={useColorModeValue('white', 'grey.900')}
              text={'User-Friendly Interface'}
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
