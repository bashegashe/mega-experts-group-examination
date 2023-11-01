import { deleteSignOut } from '../services/api';

export const signOut = async () => {
  try {
    const response = await deleteSignOut();

    if (response.success) {
      return true;
    } else {
      alert('Något gick fel vid utloggning.');
      console.error('Utloggningen misslyckades.', response);
    }
  } catch (error) {
    console.error(error);
  }
};
