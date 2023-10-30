import './SortByDateForm.css';

import { useState } from 'react';

function SortByDateForm({ onSubmit, resetState }) {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event, dateRange);
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Anropa resetState-funktionen som skickades som en egenskap
    setDateRange({ start: '', end: '' });
    resetState(event);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <section className='sortbydate__container'>
        <input
          className='sortbydate__input'
          type='date'
          name='start'
          placeholder='Startdatum'
          value={dateRange.start}
          onChange={(event) => handleChange(event)}
        />

        <p className='sortbydate__dash'>-</p>
        <input
          className='sortbydate__input'
          type='date'
          name='end'
          placeholder='Slutdatum'
          value={dateRange.end}
          onChange={(event) => handleChange(event)}
        />
      </section>
      <button className='button__dateselect' type='submit'>
        Filtrera efter datum
      </button>

      {dateRange.start !== '' || dateRange.end !== '' ? (
        <button className='button__dateselect' onClick={handleReset}>
          Återställ datum
        </button>
      ) : null}
    </form>
  );
}

export default SortByDateForm;
