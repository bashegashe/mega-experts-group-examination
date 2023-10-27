import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/Menu/Menu';
import Loader from '../components/Loader/Loader';
import MeetupLargeCard from '../components/MeetupLargeCard/MeetupLargeCard';
import Search from '../components/Search/Search';
import Filter from '../components/Filter/Filter';

import { getAllMeetups } from '../services/api';
import { MeetupFullDetail } from '../types/types';

import { BASE_URI } from '../utils/constants';

// const filterIcon = `./filter.svg`;
const filterIcon1 = `${BASE_URI}filter.svg`;

function Meetups() {
  const [meetups, setMeetups] = useState<MeetupFullDetail[]>([]);
  const [query, setQuery] = useState('');
  const [queriedMeetups, setQueriedMeetups] = useState<MeetupFullDetail[]>([]);
  const [filters, setFilters] = useState([]);
  const [filteredMeetups, setFilteredMeetups] = useState<MeetupFullDetail[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetFilters = (event) => {
    event.preventDefault();
    setFilters([]);
    setFilteredMeetups([]);
    console.log(filters);
  };

  const handleFilterChange = (event, data) => {
    event.preventDefault();
    const value = data;
    const key = event.target.value;

    // Skapa ett nytt filterobjekt
    const newFilter = { [key]: value };

    // Skapa en kopia av befintliga filter och lägg till de nya filtret
    const currentFilters = [...filters, newFilter];
    console.log('filter', currentFilters);

    // Uppdatera filtertillståndet med de nya filtren
    setFilters(currentFilters);

    // Skapa en kopia av alla meetups för att behålla originaldata
    let currentMeetups = [];
    if (queriedMeetups) {
      currentMeetups = [...queriedMeetups];
    } else {
      currentMeetups = [...meetups];
    }
    console.log('Current', currentMeetups);
    let filteredMeetupIds = new Set();

    // Loopa igenom varje filter och filtrera meetups med "eller" (OR) logik
    currentFilters.forEach((filter) => {
      const value = Object.values(filter)[0];
      const newFilteredMeetups = currentMeetups.filter((meetup) => {
        return meetup.category === value || meetup.location === value;
      });

      // Lägg till de nya filtrerade meetups i set:et
      newFilteredMeetups.forEach((meetup) => {
        filteredMeetupIds.add(meetup.id);
      });
    });

    // Konvertera set:et till en array av unika ID:er
    const filteredMeetupIdsArray = Array.from(filteredMeetupIds);

    // Använd de unika ID:erna för att hämta de matchande meetups
    const filteredMeetups = currentMeetups.filter((meetup) => filteredMeetupIdsArray.includes(meetup.id));

    // let filteredMeetups = [];

    // // Loopa igenom varje filter och filtrera meetups med "eller" (OR) logik
    // currentFilters.forEach((filter) => {
    //   const value = Object.values(filter)[0];
    //   const newFilteredMeetups = currentMeetups.filter((meetup) => {
    //     return meetup.category === value || meetup.location === value;
    //   });

    //   // Lägg till de nya filtrerade meetups till den totala listan
    //   filteredMeetups.push(...newFilteredMeetups);
    // });

    // Uppdatera meetups med de filtrerade värdena
    setFilteredMeetups(filteredMeetups);
    console.log('filtrerade meetups', filteredMeetups);
  };

  const fetchMeetups = async () => {
    const response = await getAllMeetups();

    if (response.success === true) {
      setMeetups(response.data.meetups);

      setIsLoading(false);
    }
    if (response.error === 'Token in cookie is missing') {
      setIsLoading(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMeetups();
  }, []);

  const queryMeetups = (meetups: MeetupFullDetail[], query: string) => {
    return meetups.filter((meetup) => meetup.title.toLowerCase().includes(query.toLowerCase()));
  };

  useEffect(() => {
    const queried = queryMeetups(meetups, query);
    setQueriedMeetups(queried);
  }, [meetups, query]);

  return (
    <main className='main'>
      <h3 className='main__title'>Meetups</h3>
      <Menu />
      <div style={{ width: '300px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className={`button__filter ${isOpen ? 'hide-bg' : ''}`}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? '-' : ''}
        </button>
      </div>
      {isOpen && (
        <>
          <Filter meetups={meetups} data='category' handleFilterChange={handleFilterChange} />
          <Filter meetups={meetups} data='location' handleFilterChange={handleFilterChange} />
          <button className='button__remove' onClick={handleResetFilters}>
            Rensa filter
          </button>
        </>
      )}

      <Search query={query} setQuery={setQuery} />

      {filteredMeetups.length > 0 ? (
        filteredMeetups.map((meetup) => (
          <MeetupLargeCard
            key={meetup.id}
            id={meetup.id}
            title={meetup.title}
            description={meetup.description}
            category={meetup.category}
            date={meetup.date}
            host={meetup.host}
            location={meetup.location}
            rating={meetup.rating}
          />
        ))
      ) : query && queriedMeetups.length > 0 ? (
        queriedMeetups.map((meetup) => (
          <MeetupLargeCard
            key={meetup.id}
            id={meetup.id}
            title={meetup.title}
            description={meetup.description}
            category={meetup.category}
            date={meetup.date}
            host={meetup.host}
            location={meetup.location}
            rating={meetup.rating}
          />
        ))
      ) : meetups.length > 0 ? (
        meetups.map((meetup) => (
          <MeetupLargeCard
            key={meetup.id}
            id={meetup.id}
            title={meetup.title}
            description={meetup.description}
            category={meetup.category}
            date={meetup.date}
            host={meetup.host}
            location={meetup.location}
            rating={meetup.rating}
          />
        ))
      ) : (
        <p className='main__text'>Inga planerade meetups.</p>
      )}

      {isLoading && <Loader />}
    </main>
  );
}

export default Meetups;
