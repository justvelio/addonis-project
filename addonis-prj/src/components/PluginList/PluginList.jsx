import PropTypes from 'prop-types';
import { Box, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PluginCardLanding } from '../PluginCardLanding/PluginCardLanding';

function PluginList({ plugins }) {
  const approvedPlugins = plugins
    .filter((plugin) => plugin.status === 'approved')
    .slice(0, 6);

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 6 });

  return (
    <Box>
      <SimpleGrid columns={columns} spacing={4}>
        {approvedPlugins.map((plugin) => (
          <PluginCardLanding key={plugin.id} plugin={plugin} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

PluginList.defaultProps = {
  plugins: [],
};

PluginList.propTypes = {
  plugins: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
    })
  ).isRequired,
};

export default PluginList;
