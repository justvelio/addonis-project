import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaGitlab, FaLinkedin } from "react-icons/fa";

const PersonModal = ({ isOpen, onClose, person }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay
        css={{
          backdropFilter: isOpen ? "blur(4px)" : "none",
          transition: "backdrop-filter 0.3s ease-in-out",
        }}
      />
      <ModalContent>
        <ModalHeader>{person?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            Here you can find {person?.name}'s profiles on GitLab and LinkedIn:
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <a href={person?.gitlab} target="_blank" rel="noopener noreferrer">
              <IconButton
                size={"lg"}
                aria-label="GitLab"
                icon={<FaGitlab />}
                colorScheme="blue"
              />
            </a>
            <a
              href={person?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton
                size={"lg"}
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                colorScheme="blue"
              />
            </a>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PersonModal;
