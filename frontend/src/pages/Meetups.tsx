import Menu from '../components/Menu/Menu';

function Meetups() {
  const APIURI = import.meta.env.VITE_APP_API_URL;

  const fetchProfile = async () => {
    try {
      const url = `${APIURI}/profile`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        alert('Något gick fel vid hämtning av profil.');
        console.error('Hämtning av profil misslyckades.');
      }
    } catch (error) {
      console.error('Ett fel uppstod:', error);
    }
  };

  const fetchMeetups = async () => {
    try {
      const url = `${APIURI}/meetups`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        alert('Något gick fel vid hämtning av meetups.');
        console.error('Hämtning av meetups misslyckades.');
      }
    } catch (error) {
      console.error('Ett fel uppstod:', error);
    }
  }

  return (
    <main className='main'>
      <h3 className='main__title'>Meetups</h3>
      <Menu />
      <div style={{marginBottom: '1rem'}}>
        <button onClick={fetchProfile}>Fetch profile</button>
      </div>
      <button onClick={fetchMeetups}>Fetch meetups</button>
    </main>
  );
}

export default Meetups;
