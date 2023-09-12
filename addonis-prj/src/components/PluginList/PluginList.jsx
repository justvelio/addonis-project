import PropTypes from 'prop-types';
import { SimpleGrid } from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PluginCard } from '../../components/PluginCard/PluginCard';

function PluginList({ plugins }) {
  const approvedPlugins = plugins
    .filter(plugin => plugin.status === "approved")
    .slice(0, 6); // Show only the first 6 approved plugins

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
      {approvedPlugins.map(plugin => (
        <PluginCard key={plugin.id} plugin={plugin} />
      ))}
    </SimpleGrid>
  );
}

PluginList.defaultProps = {
  plugins: [],
};

PluginList.propTypes = {
  plugins: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string
    })
  ).isRequired,
};

export default PluginList;

// PluginList.propTypes = {
//   plugins: PropTypes.arrayOf(
//     PropTypes.shape({
//       status: PropTypes.string
//     })
//   ).isRequired,
//   onClick: PropTypes.func.isRequired,
// };
