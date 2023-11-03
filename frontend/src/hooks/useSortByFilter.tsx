import { useEffect } from 'react';

import { MeetupFullDetail } from '../types/types';

function useSortByFilter(
  meetups: MeetupFullDetail[],
  filters: {
    query: string;
    locations: string[];
    categories: string[];
    startDate: string;
    endDate: string;
  },
  setFilteredMeetups: React.Dispatch<React.SetStateAction<MeetupFullDetail[]>>
) {
  useEffect(() => {
    const filteredMeetups = meetups.filter((meetup) => {
      if (filters.query && !meetup.title.toLowerCase().includes(filters.query.toLowerCase())) {
        return false;
      }

      if (filters.startDate && filters.endDate) {
        const meetupDate = new Date(meetup.date);
        const startDate = new Date(filters.startDate);
        startDate.setHours(0, 0, 0);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59);

        if (meetupDate < startDate || meetupDate > endDate) {
          return false;
        }
      }

      if (filters.categories.length > 0 && !filters.categories.includes(meetup.category)) {
        return false;
      }

      if (filters.locations.length > 0 && !filters.locations.includes(meetup.location)) {
        return false;
      }

      return true;
    });

    setFilteredMeetups(filteredMeetups);
  }, [filters, meetups]);
}

export default useSortByFilter;
