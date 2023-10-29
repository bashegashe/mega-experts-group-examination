import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Logo from '../components/Logo/Header';
import AuthForm from '../components/AuthForm/AuthForm';

import { postSignup } from '../services/api';
import { FormData } from '../types/types';
import Loader from '../components/Loader/Loader';

// const APIURI = import.meta.env.VITE_APP_API_URL;

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData: FormData) => {
    if (!formData.username || !formData.password) return;
    setIsLoading(true);

    try {
      const requestBody: FormData = {
        username: formData.username,
        password: formData.password,
      };

      const response = await postSignup(JSON.stringify(requestBody));

      if (response.success) {
        // setIsLoading(false);
        navigate('/login');
      } else if (response.error === 'password length must be at least 6 characters long') {
        alert('Lösenordet måste innehålla minst 6 tecken.');
      } else {
        alert('Något gick fel vid registeringen.');
        console.error('Registreringen misslyckades.', response);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Ett fel uppstod:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className='main'>
      <Logo />
      <h3 className='main__title'>Skapa en användare</h3>
      <AuthForm onSubmit={handleSignup} initialValues={{ username: '', password: '' }} />
      {isLoading && <Loader />}
      <p className='auth__changeview'>
        Har du redan ett konto? Logga in <Link to='/login'>här</Link>
      </p>
    </main>
  );
}

export default Signup;
