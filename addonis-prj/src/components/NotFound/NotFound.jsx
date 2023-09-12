import { Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

function NotFoundPage() {
  const navigate = useNavigate();

  const props = useSpring({
    from: { opacity: 0, marginTop: -500 },
    to: { opacity: 1, marginTop: 0 },
    delay: 200
  });

  const descProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <animated.div style={props} className="text-9xl font-bold transform transition-transform duration-1000 ease-out hover:scale-105">
        404
      </animated.div>
      <animated.h1 style={descProps} className="mb-4 text-2xl font-bold">Oops, page not found!</animated.h1>
      <animated.p style={descProps} className="mb-6 text-center text-gray-600">The page you're looking for might have been moved or deleted.</animated.p>
      <Button colorScheme="blue" onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  );
}

export default NotFoundPage;