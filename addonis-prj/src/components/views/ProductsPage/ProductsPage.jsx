import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ref, get } from "firebase/database";
import { db } from "../../../config/firebase-config";

const ProductCard = ({ plugin }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      h="100%"
    >
      {/* <Image
        src={plugin.image}
        alt={plugin.name}
        borderRadius="lg"
        maxH="200px"
        objectFit="cover"
      /> */}
      <Stack mt="2" spacing="2" p="2" h={'15vh'}>
        <Heading size="md">{plugin.name}</Heading>
        <Text noOfLines={3}>{plugin.description}</Text>
        <Text>Uploader: {plugin.creator}</Text>
      </Stack>
      <Divider />
      <Stack mt="1" p="4">
        <Button colorScheme="blue" variant="solid">
          Download Now
        </Button>
      </Stack>
    </Box>
  );
};

const ProductsPage = () => {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    const pluginsRef = ref(db, "plugins");

    get(pluginsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const pluginsArray = [];
          snapshot.forEach((childSnapshot) => {
            const plugin = childSnapshot.val();
            pluginsArray.push({ ...plugin, id: childSnapshot.key });
          });
          setPlugins(pluginsArray);
        } else {
          console.log("No plugin data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching plugins:", error);
      });
  }, []);

  return (
    <Box p={20} h={'93vh'}>
      <Heading as="h1" mb={4}>
        Products
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {plugins.map((plugin) => (
          <ProductCard key={plugin.id} plugin={plugin} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductsPage;
