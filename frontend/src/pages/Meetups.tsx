import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/Menu/Menu';
import Loader from '../components/Loader/Loader';
import MeetupLargeCard from '../components/MeetupLargeCard/MeetupLargeCard';
import Search from '../components/Search/Search';
import Filter from '../components/Filter/Filter';

import { getAllMeetups } from '../services/api';
import { MeetupFullDetail } from '../types/types';
import SortByDateForm from '../components/SortByDateForm/SortByDateForm';

function Meetups() {
  const [meetups, setMeetups] = useState<MeetupFullDetail[]>([]);
  const [query, setQuery] = useState('');
  const [queriedMeetups, setQueriedMeetups] = useState<MeetupFullDetail[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }[]>([]);
  const [filteredMeetups, setFilteredMeetups] = useState<MeetupFullDetail[]>([]);
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [resetDates, setResetDates] = useState(false);
  const navigate = useNavigate();

  const handleResetFilters = (event: React.MouseEvent) => {
    event.preventDefault();

    setResetDates(true);
    setFilters([]);
    setFilteredMeetups([]);
    setIsDateFilterActive(false);

    if (resetDates) {
      setResetDates(false);
    }
  };

  const handleDateFilter = (
    event: React.FormEvent<HTMLFormElement>,
    data: { start: string; end: string }
  ) => {
    event.preventDefault();

    let currentMeetups: MeetupFullDetail[] = [];

    if (filteredMeetups.length > 0) {
      currentMeetups = [...filteredMeetups];
    } else if (queriedMeetups.length > 0) {
      currentMeetups = [...queriedMeetups];
    } else {
      currentMeetups = [...meetups];
    }

    const startDateForm = new Date(data.start);
    const endDateForm = new Date(data.end);

    endDateForm.setHours(23, 59, 59);

    const newFilteredMeetups = currentMeetups.filter((meetup) => {
      const meetupDate = new Date(meetup.date);

      return meetupDate >= startDateForm && meetupDate <= endDateForm;
    });

    setIsDateFilterActive(true);

    setFilteredMeetups(newFilteredMeetups);
  };

  const handleFilterChange = (event: React.MouseEvent<HTMLButtonElement>, data: string) => {
    event.preventDefault();
    const value = data;
    const key = event.currentTarget.value;
    const filteredMeetupIds = new Set();

    // Skapa en kopia av alla meetups för att behålla originaldata
    let currentMeetups: MeetupFullDetail[] = [];

    if (isDateFilterActive) {
      currentMeetups = [...filteredMeetups];
    } else if (queriedMeetups.length > 0) {
      currentMeetups = [...queriedMeetups];
    } else {
      currentMeetups = [...meetups];
    }

    // Skapa ett nytt filterobjekt
    const newFilter = { [key]: value };

    // Skapa en kopia av befintliga filter och lägg till de nya filtret
    const currentFilters = [...filters, newFilter];

    // Uppdatera filtertillståndet med de nya filtren
    setFilters(currentFilters);

    // Loopa igenom varje filter och filtrera meetups
    currentFilters.forEach((filter) => {
      const value = Object.values(filter)[0];
      const newFilteredMeetups = currentMeetups.filter((meetup) => {
        return meetup.category === value || meetup.location === value;
      });

      // Lägg till de nya filtrerade meetups i set
      newFilteredMeetups.forEach((meetup) => {
        filteredMeetupIds.add(meetup.id);
      });
    });

    // Konvertera set till en array av unika id
    const filteredMeetupIdsArray = Array.from(filteredMeetupIds);

    // Använd de unika id för att hämta de matchande meetups
    const filteredMeetupsArr = currentMeetups.filter((meetup) => filteredMeetupIdsArray.includes(meetup.id));

    // Uppdatera meetups med de filtrerade värdena
    setFilteredMeetups(filteredMeetupsArr);
  };

  const fetchMeetups = async () => {
    const response = await getAllMeetups();

    if (response.success === true) {
      setMeetups(response.data.meetups);

      setIsLoading(false);
    }
    if (response.error === 'Token in cookie is missing' || response.error === 'jwt expired') {
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
  }, [query]);

  return (
    <main className='main'>
      <h3 className='main__title'>Meetups</h3>
      <Menu />
      <div style={{ width: '300px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className={`button__filter ${isOpen ? 'hide-bg' : ''}`}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'X' : ''}
        </button>
      </div>
      {isOpen && (
        <>
          <Filter
            meetups={meetups}
            data='category'
            handleFilterChange={handleFilterChange}
            filters={filters}
          />
          <Filter
            meetups={meetups}
            data='location'
            handleFilterChange={handleFilterChange}
            filters={filters}
          />
          <button className='button__remove' onClick={handleResetFilters}>
            Rensa filter
          </button>
          <SortByDateForm onSubmit={handleDateFilter} resetState={handleResetFilters} />
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
