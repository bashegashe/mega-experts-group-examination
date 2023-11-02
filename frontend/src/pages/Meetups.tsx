import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useFilters from '../hooks/useFilter';
import useSortByFilter from '../hooks/useSortByFilter';

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
  const [filteredMeetups, setFilteredMeetups] = useState<MeetupFullDetail[]>([]);
  const { filters, setFilters, handleAddFilters } = useFilters();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleAddDates(dateRange: { startDate: string; endDate: string }) {
    const updatedFilters = { ...filters };

    updatedFilters.startDate = dateRange.startDate;
    updatedFilters.endDate = dateRange.endDate;

    setFilters(updatedFilters);
  }

  function handleSearch(query: string) {
    setFilters({ ...filters, query });
  }

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

  useSortByFilter(meetups, filters, setFilteredMeetups);

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
          <Filter meetups={meetups} data='category' onFilterChange={handleAddFilters} filters={filters} />
          <Filter meetups={meetups} data='location' onFilterChange={handleAddFilters} filters={filters} />
          <SortByDateForm
            onDatesChange={handleAddDates}
            setFilters={setFilters}
            setFilteredMeetups={setFilteredMeetups}
          />
        </>
      )}

      <Search onSearch={handleSearch} filters={filters} />

      {filteredMeetups.length === 0 ? (
        <p>Inga resultat</p>
      ) : (
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
      )}

      {isLoading && <Loader />}
    </main>
  );
}

export default Meetups;
