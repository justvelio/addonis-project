import React from 'react';
import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoFlaskSharp, IoEyeOff, IoFishSharp } from 'react-icons/io5';
import animationData from '../../assets/animation_lls89vqh.json'
import Lottie from 'lottie-react'


export default function ProductInfo() {

    
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Heading color={'gray'} textAlign={'center'}>🏡 Your Home, Upgraded</Heading>

          <Text color={'black'} fontSize={'lg'} textAlign={'center'}>
          Welcome to your <span className='italic'>Future Home!</span> We're dedicated to enhancing your smart home experience by offering a curated selection of innovative add-ons and downloads. Our passion lies in making your home smarter, more convenient, and truly connected.

          </Text>
          <Text color={'black'} fontSize={'lg'} textAlign={'center'}>
          Whether you're a tech enthusiast, a homeowner looking to simplify routines, or simply curious about the latest smart home advancements, we're here to guide you on this exciting journey. Our team is committed to sourcing high-quality products and resources that enhance your home's automation, security, energy efficiency, and overall comfort.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
          </Stack>
        </Stack>
        <Flex>
          <Lottie animationData = {animationData} />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
