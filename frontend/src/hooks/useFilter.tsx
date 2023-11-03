import { useState } from 'react';

function useFilters() {
  const [filters, setFilters] = useState<{
    query: string;
    locations: string[];
    categories: string[];
    startDate: string;
    endDate: string;
  }>({
    query: '',
    locations: [],
    categories: [],
    startDate: '',
    endDate: '',
  });
  function handleAddFilters(event: React.MouseEvent<HTMLButtonElement>, data: string) {
    event.preventDefault();
    const key = event.currentTarget.value;

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (key === 'category') {
        updatedFilters.categories = updatedFilters.categories.includes(data)
          ? updatedFilters.categories.filter((item) => item !== data)
          : updatedFilters.categories.concat(data);
      } else if (key === 'location') {
        updatedFilters.locations = updatedFilters.locations.includes(data)
          ? updatedFilters.locations.filter((item) => item !== data)
          : updatedFilters.locations.concat(data);
      }

      return updatedFilters;
    });
  }

  return { filters, handleAddFilters, setFilters };
}

export default useFilters;
