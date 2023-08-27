import { useState } from "react";
import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  Icon,
  Button,
  StackDivider,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import {
  IoAlertCircleOutline,
  IoNotificationsCircleOutline,
  IoHomeOutline,
  IoPhonePortraitOutline,
  IoCloudDownloadOutline,
} from "react-icons/io5";
import animationData from "../../assets/animation_lls8yso6.json";
import Lottie from "lottie-react";
import { MdFileDownload,  } from "react-icons/md"

const popoverData = [
  {
    icon: IoNotificationsCircleOutline,
    title: "Instant Notifications",
    content: "Receive timely alerts about important events in your home.",
  },
  {
    icon: IoHomeOutline,
    title: "Seamless Connectivity",
    content: "Connect all your smart home devices effortlessly.",
  },
  {
    icon: IoPhonePortraitOutline,
    title: "Efficient Monitoring",
    content: "Keep an eye on your home, even when you're away.",
  },
  {
    icon: IoCloudDownloadOutline,
    title: "Easy Updates",
    content: "Access the latest features and enhancements.",
  },
  {
    icon: IoAlertCircleOutline,
    title: "Personalized Alerts",
    content: "Customize notifications to suit your preferences.",
  },
];

export default function ProductInfo2() {
  const [activePopover, setActivePopover] = useState(null);

  const handleMouseEnter = (index) => {
    setActivePopover(index);
  };

  const handleMouseLeave = () => {
    setActivePopover(null);
  };

  return (
    <Container maxW={"5xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex justifyContent="center" alignItems="center">
          <Lottie animationData={animationData} />
        </Flex>
        <Stack spacing={4} alignItems="center">
          <Heading color={"gray"} textAlign={"center"}>
            Stay Informed and In Control with Our App!
          </Heading>

          <Text color={"black"} fontSize={"lg"} textAlign={"center"}>
            Introducing the ultimate solution for managing your smart home
            products. Our app brings the power of control right to your
            fingertips, ensuring you never miss a beat. With instant
            notifications and real-time updates, you're always in the loop about
            what's happening in your home.
          </Text>

          {popoverData.map((popover, index) => (
            <Popover
              key={index}
              isOpen={activePopover === index}
              placement="top"
              onOpen={() => handleMouseEnter(index)}
              onClose={handleMouseLeave}
              trigger="hover"
            >
              <PopoverTrigger>
                <Flex
                  alignItems="center"
                  cursor="pointer"
                  _hover={{ color: "black" }}
                >
                  <Icon as={popover.icon} color={"black"} w={5} h={5} />
                  <Text ml={2}>{popover.title}</Text>
                </Flex>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>{popover.content}</PopoverBody>
              </PopoverContent>
            </Popover>
          ))}

          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Text color={"black"} fontSize={"lg"} textAlign={"center"}>Experience the future of smart living with our app. Download now and unlock a world of convenience, security, and control</Text>
            <Button leftIcon={<MdFileDownload />} colorScheme="blue" variant="solid">
              Download Now
            </Button>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
