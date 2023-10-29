import { deleteSignOut } from '../services/api';

export const signOut = async () => {
  // const navigate = useNavigate();
  try {
    const response = await deleteSignOut();

    if (response.success) {
      // setIsLoading(false);
      return true;
      // navigate('/login');
    } else {
      alert('Något gick fel vid utloggning.');
      console.error('Utloggningen misslyckades.', response);
    }
  } catch (error) {
    // setIsLoading(false);
    console.error('Ett fel uppstod:', error);
  } finally {
    // setIsLoading(false);
  }
};
