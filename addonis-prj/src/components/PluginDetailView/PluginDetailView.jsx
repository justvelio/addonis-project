import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Link, Button, useToast } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { ref, get, set } from 'firebase/database';
import { db, auth } from '../../config/firebase-config';
import StarDisplay from '../StarDisplay/StarDisplay';

function PluginDetailView() {
  const [plugin, setPlugin] = useState(null);
  const [score, setScore] = useState(0);
  const [userHasRated, setUserHasRated] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchPluginData = async () => {
      const snapshot = await get(ref(db, 'plugins/' + id));
      const pluginData = snapshot.val();

      if (pluginData.ratings && pluginData.ratings[auth.currentUser.uid]) {
        setUserHasRated(true);
      }

      setPlugin(pluginData);
    };

    fetchPluginData();
  }, [id]);

  const handleRating = (selectedScore) => {
    setScore(selectedScore);
  };

  const submitRating = async () => {
    if (userHasRated) {
      toast({
        title: "Rating Failed.",
        description: "You've already rated this plugin.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const ratingsRef = ref(db, `plugins/${id}/ratings/${auth.currentUser.uid}`);
    await set(ratingsRef, score);

    setUserHasRated(true);
    toast({
      title: "Rating Submitted.",
      description: "Thank you for your feedback!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!plugin) return <div>Loading...</div>;

  return (
    <Box borderWidth="1px" borderRadius="lg" padding="6" overflow="hidden" mt="24">
      <Button size="sm" onClick={() => navigate(-1)} mb={4}>&larr; Back</Button>
      <Heading mb={4}>{plugin.name}</Heading>
      <Text mb={4}>{plugin.description}</Text>
      <Text mb={4}>
        <Link href={plugin.githubRepoLink} isExternal>
          {plugin.githubRepoLink}
        </Link>
      </Text>
      <Text mb={4}>
        <Link href={plugin.gitDownloadLink} isExternal>
          Download
        </Link>
      </Text>

      <StarDisplay rating={score} />

      <Button mt={4} onClick={submitRating} isDisabled={userHasRated}>Submit Rating</Button>
      {userHasRated && <Text mt={2} color="red.500">You've already rated this plugin.</Text>}
    </Box>
  );
}


export default PluginDetailView;