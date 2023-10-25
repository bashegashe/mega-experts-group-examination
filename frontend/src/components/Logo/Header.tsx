import './header.css';
import { BASE_URI } from '../../utils/constants';
// const APIURI = import.meta.env.VITE_APP_API_URL;

const logoIcon = `${BASE_URI}logo.svg`;

function Header() {
  return (
    <header className='header'>
      <img className='header__Header' src={logoIcon} alt='Logo image'></img>
      <h4 className='header__title'>
        <span>Make</span> your meeter
      </h4>
    </header>
  );
}

export default Header;
