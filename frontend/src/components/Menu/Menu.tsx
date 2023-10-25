import './menu.css';
import { useNavigate } from 'react-router-dom';

import { BASE_URI } from '../../utils/constants';

const homeIcon = `${BASE_URI}home.svg`;
const profileIcon = `${BASE_URI}profile.svg`;

function Menu() {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const link = event.currentTarget.getAttribute('data-link');

    if (link) navigate(link);
  };

  return (
    <nav className='nav'>
      <a className='nav__link' onClick={handleClick} data-link='/meetups'>
        <img src={homeIcon} alt='Home Link' />
      </a>
      <a className='nav__link' onClick={handleClick} data-link='/profile'>
        <img src={profileIcon} alt='Profile Link' />
      </a>
    </nav>
  );
}

export default Menu;
