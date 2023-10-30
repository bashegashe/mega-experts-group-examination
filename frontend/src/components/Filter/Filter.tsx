import './filter.css';

// import { useState } from 'react';

import { MeetupFullDetail } from '../../types/types';
import FilterButton from './FilterButton/FilterButton';

interface FilterProps {
  meetups: MeetupFullDetail[];
  handleFilterChange: (event: React.MouseEvent<HTMLButtonElement>, data: string) => void;
  data: string;
  filters: { [key: string]: string }[];
}

function Filter({ meetups, data, handleFilterChange, filters }: FilterProps) {
  let uniqueCategories: string[] = [];
  let uniqueLocations: string[] = [];

  if (data === 'category') {
    uniqueCategories = [...new Set(meetups.map((meetup) => meetup.category))];
  }

  if (data === 'location') {
    uniqueLocations = [...new Set(meetups.map((meetup) => meetup.location))];
  }

  return (
    <section className='filter'>
      {uniqueCategories.map((category) => (
        <FilterButton
          data={category}
          key={category}
          target='category'
          className='button__filter--green'
          handleFilterChange={handleFilterChange}
          filters={filters}
        />
      ))}
      {uniqueLocations.map((location) => (
        <FilterButton
          data={location}
          key={location}
          target='location'
          className='button__filter--turquoise'
          handleFilterChange={handleFilterChange}
          filters={filters}
        />
      ))}
    </section>
  );
}

export default Filter;
