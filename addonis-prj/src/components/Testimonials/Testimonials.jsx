import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";

const Testimonial = (props) => {
  const { children } = props;

  return <Box>{children}</Box>;
};

const TestimonialContent = (props) => {
  const { children } = props;

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = (props) => {
  const { children } = props;

  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props) => {
  const { children } = props;

  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function Testimonials() {
  return (
    <Box bg={useColorModeValue("white")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Testimonials</Heading>
          <Text>What our most valuable clients have to say about our products.</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Intuitive Design</TestimonialHeading>
              <TestimonialText>
              The app is easy to use and now
              <Spacer />
               my robot cleaner now has 3 horse powers more.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://forum.telerikacademy.com/user_avatar/forum.telerikacademy.com/victor.valtchev/45/9093_2.png'
              }
              name={'Victor Valtchev'}
              title={'Technical Trainer at Telerik'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Helpful</TestimonialHeading>
              <TestimonialText>
                Fixed a bug on my treadmill. 
                <Spacer />
                Now I can go back to test the students while working out.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://forum.telerikacademy.com/user_avatar/forum.telerikacademy.com/nadya/45/10326_2.png'
              }
              name={'Nadya Atanasova'}
              title={'Technical Training Manager'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Mindblowing Service</TestimonialHeading>
              <TestimonialText>
                Super friendly support. They helped me upgrade my money counterfeit machine 
                <Spacer />
                and now I'm richer faster every day.
                <Spacer />
                They didn't even called the police!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://forum.telerikacademy.com/user_avatar/forum.telerikacademy.com/kiril/45/1314_2.png'
              }
              name={'Kiril Stanoev'}
              title={'Senior Technical Trainer'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
