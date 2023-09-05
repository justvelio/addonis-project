import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PluginCard from '../PluginCard/PluginCard';

export default function PluginList({ plugins, onClick }) {
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
      {plugins.map(plugin => (
        <PluginCard key={plugin.id} plugin={plugin} onClick={() => onClick(plugin)} />
      ))}
    </Carousel>
  );
}