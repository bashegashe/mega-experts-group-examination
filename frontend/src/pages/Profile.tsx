import Menu from '../components/Menu/Menu';
import MeetupSmallCard from '../components/MeetupSmallCard/MeetupSmallCard';

import { getMeetupsProfile } from '../services/api';
import { useEffect, useState } from 'react';

// import { BASE_URI } from '../utils/constants';
// const templateImg = `${BASE_URI}templateSmall.svg`;
const templateImg = `/templateSmall.svg`;
const meetupEvent = {
  title: 'JS-Utveckling',
  location: 'Göteborg',
  category: 'Coding Event',
  meetUpId: 1,
  timestamp: '2023-10-24T12:38:50.644Z',
};

function Profile() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getMeetupsProfile();

      console.log(data);

      if (data.status === true) {
        console.log(data);
        setMeetups(data.data);
      }
    };

    getData();
  }, []);

  return (
    <main className='main'>
      <h3 className='main__title'>Min Profil</h3>
      <h4 className='main__subtitle'>Kommande Meetups</h4>
      <p>{meetups}</p>
      <MeetupSmallCard templateImg={templateImg} meetupEvent={meetupEvent} />
      <h4 className='main__subtitle'>Tidigare Meetups</h4>
      <Menu />
    </main>
  );
}

export default Profile;
