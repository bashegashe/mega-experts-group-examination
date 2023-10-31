import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo/Header';
import AuthForm from '../components/AuthForm/AuthForm';
import { postSignup } from '../services/api';
import { FormData } from '../types/types';
import Loader from '../components/Loader/Loader';

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

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
        setRegistrationSuccess(true);
      } else if (response.error === 'password length must be at least 6 characters long') {
        alert('Lösenordet måste innehålla minst 6 tecken.');
      } else if (response.error === 'Username already exists') {
        alert('Det här användarnamnet är upptaget.');
      } else {
        alert('Något gick fel vid registreringen.');
        console.error('Registreringen misslyckades.', response);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Ett fel uppstod:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        navigate('/login');
      }

      return () => {
        clearInterval(countdownTimer);
      };
    }
  }, [registrationSuccess, countdown, navigate]);

  return (
    <main className='main'>
      <Logo />
      <h3 className='main__title'>Skapa en användare</h3>
      <AuthForm onSubmit={handleSignup} initialValues={{ username: '', password: '' }} />
      {isLoading && <Loader />}
      {registrationSuccess && (
        <p className='main__success'>
          Registreringen lyckades, du skickas vidare till inloggning om {countdown}...
        </p>
      )}
      <p className='auth__changeview'>
        Har du redan ett konto? Logga in <Link to='/login'>här</Link>
      </p>
    </main>
  );
}

export default Signup;
