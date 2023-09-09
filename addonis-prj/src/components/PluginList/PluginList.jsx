import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PluginCard from '../PluginCard/PluginCard';

function PluginList({ plugins, onClick }) {
  const approvedPlugins = plugins.filter(plugin => plugin.status === "approved");

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showArrows={true}
      centerMode
      infiniteLoop
      slidesToShow={5}
      dynamicWidth
    >
      {approvedPlugins.map(plugin => (
        <PluginCard key={plugin.id} plugin={plugin} onClick={() => onClick(plugin)} />
      ))}
    </Carousel>
  );
}

// Default Prop
PluginList.defaultProps = {
  onClick: () => { }
};

PluginList.propTypes = {
  plugins: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string
    })
  ).isRequired,
  onClick: PropTypes.func,
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
