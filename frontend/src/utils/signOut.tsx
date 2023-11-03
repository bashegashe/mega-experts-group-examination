import { deleteSignOut } from '../services/api';

export const signOut = async () => {
  try {
    const response = await deleteSignOut();

    if (response.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
