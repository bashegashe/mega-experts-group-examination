import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../components/Logo';

const APIURI = import.meta.env.VITE_APP_API_URL

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data.username || !data.password) return;

    try {
      const url = `${APIURI}/api/auth/register`;
      const requestBody = {
        username: data.username,
        password: data.password,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        navigate('/login');
      } else {
        alert('Något gick fel vid registeringen.');
        console.error('Registreringen misslyckades.');
      }
    } catch (error) {
      console.error('Ett fel uppstod:', error);
    }
  };
  return (
    <main className='main'>
      <Logo />
      <h3 className='main__title'>Skapa en användare</h3>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='input__large'
          name='username'
          type='text'
          placeholder='Användarnamn'
          value={data.username}
          onChange={handleChange}
        />
        <input
          className='input__large'
          name='password'
          type='password'
          placeholder='Lösenord'
          value={data.password}
          onChange={handleChange}
        />

        <button className='button__large' type='submit'>
          Logga in
        </button>
      </form>
      <p className='auth__changeview'>
        Har du redan ett konto? Logga in <Link to='/login'>här</Link>
      </p>
    </main>
  );
}

export default Signup;
