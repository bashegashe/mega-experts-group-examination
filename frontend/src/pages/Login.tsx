import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Logo from '../components/Logo/Header';
import Menu from '../components/Menu/Menu';
import AuthForm from '../components/AuthForm/AuthForm';

import { postSignin } from '../services/api';
import { FormData } from '../types/types';
import Loader from '../components/Loader/Loader';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    if (!formData.username || !formData.password) return;
    setIsLoading(true);
    try {
      const requestBody: FormData = {
        username: formData.username,
        password: formData.password,
      };

      const response = await postSignin(JSON.stringify(requestBody));

      if (response.success) {
        console.log(response);
        navigate('/meetups');
      } else {
        alert('Felaktigt användarnamn eller lösenord.');
        console.error('Inloggning misslyckades.');
      }
    } catch (error) {
      console.error('Ett fel uppstod:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='main'>
      <Logo />
      <h3 className='main__title'>Logga in</h3>
      <AuthForm onSubmit={handleLogin} initialValues={{ username: '', password: '' }} />
      {isLoading && <Loader />}

      <p className='auth__changeview'>
        Inget konto än? Skapa ett <Link to='/signup'>här</Link>
      </p>
      <Menu />
    </main>
  );
}

export default Login;
