// import { useContext } from 'react';
import { Button } from '@chakra-ui/react';
// import AppContext from '../../context/AppContext';
import { logoutUser } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  // const { setContext } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      // setContext({
        // user: null,
      // });
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <Button onClick={handleSignOut} colorScheme="red">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
