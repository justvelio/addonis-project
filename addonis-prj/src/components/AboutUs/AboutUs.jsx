import React, { useState } from "react";
import { Center, Avatar, Stack, Text, Heading } from "@chakra-ui/react";
import PersonModal from "./PersonModal";

const avatars = [
  { name: "Ruska Igorova", imageSrc: "https://gitlab.com/uploads/-/system/user/avatar/14155319/avatar.png?width=96" },
  { name: "Denis Metodiev", imageSrc: "https://gitlab.com/uploads/-/system/user/avatar/14141621/avatar.png?width=96" },
  { name: "Velislav Kostadinov", imageSrc: "https://gitlab.com/uploads/-/system/user/avatar/14276278/avatar.png?width=96" },
];

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const openModal = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPerson(null);
    setIsModalOpen(false);
  };

  const addLinksToPersons = () => {
    const avatarsWithLinks = avatars.map((avatar) => {
      switch (avatar.name) {
        case "Ruska Igorova":
          avatar.gitlab = "https://gitlab.com/RuskaIg";
          avatar.linkedin = "https://www.linkedin.com/in/ruskaigorova";
          break;
        case "Denis Metodiev":
          avatar.gitlab = "https://gitlab.com/DNMetodiev";
          avatar.linkedin = "https://www.linkedin.com/in/denis-metodiev-b6b0411a8/";
          break;
        case "Velislav Kostadinov":
          avatar.gitlab = "https://gitlab.com/justvelio";
          avatar.linkedin = "https://www.linkedin.com/in/v-kostadinov/";
          break;
        default:
          break;
      }
      return avatar;
    });
    return avatarsWithLinks;
  };

  const avatarsWithLinks = addLinksToPersons();

  return (
    <>
      <Center h="93vh" pb={40}>
        <Stack spacing={4} direction="column">
          <Heading textAlign="center" pt={20}>
            The team of{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              FutureHome.
            </Text>
          </Heading>
          {avatarsWithLinks.map((avatar, index) => (
            <Stack
              key={index}
              alignItems="center"
              onClick={() => openModal(avatar)}
              cursor="pointer"
            >
              <Avatar
                size="2xl"
                name={avatar.name}
                src={avatar.imageSrc}
                bg="teal.500"
                color="white"
                boxShadow="md"
              />
              <Text fontSize="lg" fontWeight="bold">
                {avatar.name}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Center>
      <PersonModal isOpen={isModalOpen} onClose={closeModal} person={selectedPerson} />
    </>
  );
};

export default AboutUs;
