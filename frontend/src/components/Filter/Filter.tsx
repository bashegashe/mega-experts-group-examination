import './filter.css';

import { FilterProps } from '../../types/types';
import FilterButton from './FilterButton/FilterButton';

function Filter({ meetups, data, onFilterChange, filters }: FilterProps) {
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
          onFilterChange={onFilterChange}
          filters={filters}
        />
      ))}
      {uniqueLocations.map((location) => (
        <FilterButton
          data={location}
          key={location}
          target='location'
          className='button__filter--turquoise'
          onFilterChange={onFilterChange}
          filters={filters}
        />
      ))}
    </section>
  );
}

export default Filter;
