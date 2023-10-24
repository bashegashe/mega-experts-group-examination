const logoIcon = `/logo.svg`;

function Logo() {
  return (
    <header className='header'>
      <img className='header__logo' src={logoIcon} alt='Logo image'></img>
      <h4 className='header__title'>
        <span>Make</span> your meeter
      </h4>
    </header>
  );
}

export default Logo;
