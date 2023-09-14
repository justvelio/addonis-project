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
  Input,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  StackDivider,
} from "@chakra-ui/react";
import {
  IoAlertCircleOutline,
  IoNotificationsCircleOutline,
  IoHomeOutline,
  IoPhonePortraitOutline,
  IoCloudDownloadOutline,
} from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import animationData from "../../assets/animation_lls8yso6.json";
import Lottie from "lottie-react";
import { ref, push } from 'firebase/database';
import { db } from '../../config/firebase-config';

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
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleMouseEnter = (index) => setActivePopover(index);
  const handleMouseLeave = () => setActivePopover(null);

  const handleSubscription = async () => {
    try {
      const subscriptionRef = ref(db, 'subscriptions');
      await push(subscriptionRef, { email });
      setIsSubscribed(true);
    } catch (error) {
      console.error("Error subscribing: ", error);
    }
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
            Introducing the ultimate solution...
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
            divider={<StackDivider borderColor={useColorModeValue("gray.100", "gray.700")} />}
          >
            <Text color={"black"} fontSize={"lg"} textAlign={"center"}>
              Experience the future of smart living...
            </Text>
            <Button leftIcon={<MdFileDownload />} colorScheme="blue" variant="solid">
              Coming soon!
            </Button>
            <Text color={"black"} fontSize={"lg"} textAlign={"center"}>
              Join the exclusive list and be alerted when our app goes live!
            </Text>
            {isSubscribed ? (
              <Text>Thank you for subscribing!</Text>
            ) : (
              <Stack spacing={4} direction={"row"}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  variant="filled"
                  type="email"
                />
                <Button onClick={handleSubscription}>Subscribe</Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}