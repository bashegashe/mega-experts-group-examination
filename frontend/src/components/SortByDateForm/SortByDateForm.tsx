import './sortByDateForm.css';

import { useState } from 'react';

import { SortByDateFormProps } from '../../types/types';

function SortByDateForm({ onDatesChange, setFilters, setFilteredMeetups }: SortByDateFormProps) {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDateRange({ ...dateRange, [name]: value });
    onDatesChange({ ...dateRange, [name]: value });
  };

  const handleResetFilters = (event: React.MouseEvent) => {
    event.preventDefault();
    setDateRange({ startDate: '', endDate: '' });

    setFilters({
      query: '',
      locations: [],
      categories: [],
      startDate: '',
      endDate: '',
    });
    setFilteredMeetups([]);
  };

  return (
    <form className='sortbydate__container' onSubmit={(event) => event.preventDefault()}>
      <section className='sortbydate__inputs'>
        <input
          className='sortbydate__input'
          type='date'
          name='startDate'
          placeholder='Startdatum'
          value={dateRange.startDate}
          onChange={(event) => handleChange(event)}
        />

        <p className='sortbydate__dash'>-</p>
        <input
          className='sortbydate__input'
          type='date'
          name='endDate'
          placeholder='Slutdatum'
          value={dateRange.endDate}
          onChange={(event) => handleChange(event)}
        />
      </section>
      <button className='button__remove' onClick={handleResetFilters}>
        Rensa filter
      </button>
    </form>
  );
}

// function SortByDateForm({ onSubmit, resetState }: SortByDateFormProps) {
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDateRange({ ...dateRange, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     onSubmit(event, dateRange);
//   };

//   const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.preventDefault();

//     setDateRange({ start: '', end: '' });
//     resetState(event);
//   };

//   return (
//     <form className='sortbydate__container' onSubmit={(event) => handleSubmit(event)}>
//       <section className='sortbydate__inputs'>
//         <input
//           className='sortbydate__input'
//           type='date'
//           name='start'
//           placeholder='Startdatum'
//           value={dateRange.start}
//           onChange={(event) => handleChange(event)}
//         />

//         <p className='sortbydate__dash'>-</p>
//         <input
//           className='sortbydate__input'
//           type='date'
//           name='end'
//           placeholder='Slutdatum'
//           value={dateRange.end}
//           onChange={(event) => handleChange(event)}
//         />
//       </section>
//       <button className='button__dateselect' type='submit'>
//         Filtrera efter datum
//       </button>

//       {dateRange.start !== '' || dateRange.end !== '' ? (
//         <button className='button__dateselect' onClick={handleReset}>
//           Återställ datum
//         </button>
//       ) : null}
//     </form>
//   );
// }

export default SortByDateForm;
