import './menu.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Loader from '../Loader/Loader';

import { BASE_URI } from '../../utils/constants';
import { signOut } from '../../utils/signOut';

const homeIcon = `${BASE_URI}home.svg`;
const profileIcon = `${BASE_URI}profile.svg`;
const logoutIcon = `${BASE_URI}logout.svg`;

function Menu() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const link = event.currentTarget.getAttribute('data-link');

    if (link) navigate(link);
  };

  const handleSignOut = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await signOut();

    if (response) {
      setIsLoading(false);
      navigate('/login');
    }

    if (!response) {
      alert('Något gick fel vid utloggning.');
      navigate('/login');
      setIsLoading(false);
    }
  };

  return (
    <nav className='nav'>
      <a className='nav__link' onClick={handleClick} data-link='/meetups'>
        <img src={homeIcon} alt='Home Link' />
      </a>
      <a className='nav__link' onClick={handleClick} data-link='/profile'>
        <img src={profileIcon} alt='Profile Link' />
      </a>
      <a className='nav__link' onClick={handleSignOut} data-link='/'>
        {isLoading ? (
          <Loader className='loader--small' />
        ) : (
          <img className='nav__img' src={logoutIcon} alt='Logout Link' />
        )}
      </a>
    </nav>
  );
}

export default Menu;
