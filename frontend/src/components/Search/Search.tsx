import { useEffect, useRef } from 'react';

function Search({ onSearch, filters }) {
  const inputElem = useRef<HTMLInputElement | null>(null);

  useEffect(function () {
    if (inputElem.current) {
      inputElem.current.focus();
    }
  }, []);

  return (
    <input
      className='input__large input__large--margin'
      type='text'
      placeholder='Sök meetups...'
      value={filters.query}
      onChange={(e) => onSearch(e.target.value)}
      ref={inputElem}
    />
  );
}

export default Search;
