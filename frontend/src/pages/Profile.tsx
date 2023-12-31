import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '.././components/Menu/Menu';
import MeetupSmallCard from '../components/MeetupSmallCard/MeetupSmallCard';
import Loader from '../components/Loader/Loader';

import { deleteBooking, getMeetupsProfile } from '../services/api';

import { BASE_URI } from '../utils/constants';
import { Meetup } from '../types/types';
const templateImg = `${BASE_URI}templateSmall.svg`;

function Profile() {
  const [oldMeetups, setOldMeetups] = useState([]);
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReLoading, setIsReLoading] = useState(false);
  const navigate = useNavigate();

  const getAllMeetups = async () => {
    const data = await getMeetupsProfile();
    if (data.success === true) {
      setOldMeetups(data.data.oldMeetups);
      setUpcomingMeetups(data.data.upcomingMeetups);
      setIsLoading(false);
    }
    if (data.error === 'Token in cookie is missing' || data.error === 'jwt expired') {
      setIsLoading(false);
      navigate('/login');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    setIsReLoading(true);
    try {
      const response = await deleteBooking(id);

      if (response.success) {
        getAllMeetups();
      }

      if (!response.success) {
        alert('Något gick fel vid avbokning.');
      }
    } catch (error) {
      console.error('Ett fel uppstod:', error);
    } finally {
      setIsReLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllMeetups();
  }, []);

  return (
    <main className='main'>
      <h3 className='main__title'>Min Profil</h3>
      <h4 className='main__subtitle'>Kommande Meetups</h4>

      {upcomingMeetups.length > 0 ? (
        upcomingMeetups.map((meetup: Meetup) => (
          <MeetupSmallCard
            key={meetup.id}
            id={meetup.id}
            templateImg={templateImg}
            title={meetup.title}
            description={meetup.description}
            showButton={true}
            handleDeleteBooking={handleDeleteBooking}
          />
        ))
      ) : (
        <p className='main__text'>Inga kommande meetups bokade</p>
      )}
      {isLoading || (isReLoading && <Loader />)}
      <h4 className='main__subtitle'>Tidigare Meetups</h4>

      {oldMeetups.length > 0 ? (
        oldMeetups.map((meetup: Meetup) => (
          <MeetupSmallCard
            key={meetup.id}
            id={meetup.id}
            templateImg={templateImg}
            title={meetup.title}
            description={meetup.description}
            showButton={false}
            handleDeleteBooking={handleDeleteBooking}
          />
        ))
      ) : (
        <p>Inga tidigare meetups.</p>
      )}
      {isLoading && !isReLoading && <Loader />}

      <Menu />
    </main>
  );
}

export default Profile;
