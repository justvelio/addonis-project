import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Link, Button, } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { ref, get, } from 'firebase/database';
import { db } from '../../config/firebase-config';

function PluginDetailView() {
  const [plugin, setPlugin] = useState(null);
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPluginData = async () => {
      const snapshot = await get(ref(db, 'plugins/' + id));
      const pluginData = snapshot.val();
      setPlugin(pluginData);
    };

    fetchPluginData();
  }, [id]);

  const handleRating = (selectedScore) => {
    setScore(selectedScore);
  };

  const submitRating = () => {
    console.log('Rating submitted:', score);
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
      <Box d="flex" mt="2" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < score ? 'teal.500' : 'gray.300'}
              onClick={() => handleRating(i + 1)}
            />
          ))}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {score} reviews
        </Box>
      </Box>
      <Button mt={4} onClick={submitRating}>Submit Rating</Button>
    </Box>
  );
}

export default PluginDetailView;