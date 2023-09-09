import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
  const partnerData = [
    {
      name: 'Telerik Academy',
      description: 'Telerik Academy is a tech-ed initiative that educates people of all ages for the Bulgarian IT industry. It offers free schools for school students, 6-month programs for young professionals and career switchers, and comprehensive courses for lifelong learners. Telerik Academy was established in 2009 and has a GitHub repository with various projects',
      imageUrl:
        'https://hicomm.bg/uploads/articles/202005/63445/mainimage-telerik-akademiya-startira-prvata-v-blgariya-cyalostna-programa-za-produktovi-menidzhri-v-it-sektora.jpg',
      websiteUrl: 'https://www.telerikacademy.com/',
    },
    {
      name: 'Alexa',
      description: 'Alexa is a virtual assistant technology that works on many devices from Amazon and other manufacturers. It was first used in the Amazon Echo smart speaker in 2014. Alexa is part of Amazon’s cloud-based voice service and voice AI. Alexa is also related to Alexa Internet, a web traffic analysis company that was acquired by Amazon in 1993.',
      imageUrl: 'https://play-lh.googleusercontent.com/X24ol80nJS3F_nUg3HlqWWzSxEnDHeAI34quN8rTjILQOoebd0Be3ZFBQrKAtMX2XyE',
      websiteUrl: 'https://www.amazon.com/alexa',
    },
    {
      name: 'iNovativa',
      description: 'iNovativa is a Bulgarian company that specializes in automation of homes, buildings, offices, hotels and more. They have completed over 100 projects and have more than 30 partnerships. Their mission is to help people build their dream homes with innovative and technological solutions.',
      imageUrl: 'https://inovativa.bg/wp-content/uploads/2020/11/%D0%A3%D0%BC%D0%B5%D0%BD-%D0%B4%D0%BE%D0%BC-iNovativa-smart-home-logo-1-768x911.png',
      websiteUrl: 'https://inovativa.bg/',
    },
  ];
  
  export default function Partners() {
    const isWideScreen = useBreakpointValue({ base: false, md: true });
  
    return (
      <>
        {partnerData.map((partner, index) => (
          <Stack
            key={index}
            minH={isWideScreen ? '50vh' : '100vh'}
            h={'60vh'}
            direction={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
          >
            <Flex p={4} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={4} w={'100%'} maxW={'md'}>
                <Heading fontSize={{ base: '2xl', md: '3xl' }}>
                  {partner.name}
                </Heading>
                <Text fontSize={{ base: 'sm', lg: 'md' }} color={'gray.500'}>
                  {partner.description}
                </Text>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                  <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Visit Website
                    </Button>
                  </a>
                </Stack>
              </Stack>
            </Flex>
            <Flex flex={1} justify="center" align="center">
              <Image
                alt={partner.name}
                objectFit="contain"
                src={partner.imageUrl}
                maxH={isWideScreen ? '100%' : '50vh'}
                maxW="100%"
              />
            </Flex>
          </Stack>
        ))}
      </>
    );
  }
  