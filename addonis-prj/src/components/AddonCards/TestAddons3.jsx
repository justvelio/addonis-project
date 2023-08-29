import React from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa'; // Import the star icon

const IMAGE =
  'https://www.nih.gov/sites/default/files/news-events/research-matters/2014/20140505-resilience.jpg';

  export default function TestAddon3() {
    return (
      <Box p={2} maxW={'240px'} w={'full'}>
        <Box
          p={4}
          bg={useColorModeValue('gray.100', 'gray.700')}
          boxShadow={'md'}
          rounded={'lg'}
        >
          <Box
            rounded={'lg'}
            overflow={'hidden'}
            pos={'relative'}
            height={'150px'}
            mb={2}
          >
            <Image
              alt={'Addon'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={IMAGE}
            />
          </Box>
          <Stack spacing={0} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Neurotransmitter
            </Text>
            <Heading fontSize={'lg'} fontFamily={'body'} fontWeight={500}>
              Dopamine Booster
            </Heading>
            <Flex justify={'center'}>
              <Stack direction={'row'} spacing={1} align={'center'}>
                <Icon as={FaStar} color={'yellow.400'} />
                <Icon as={FaStar} color={'yellow.400'} />
                <Icon as={FaStar} color={'yellow.400'} />
                <Icon as={FaStar} color={'yellow.400'} />
                <Icon as={FaStar} color={'gray.300'} />
              </Stack>
            </Flex>
            <Text fontWeight={600} fontSize={'lg'} color={'gray.900'}>
              $325.99
            </Text>
          </Stack>
        </Box>
      </Box>
    );
  }
