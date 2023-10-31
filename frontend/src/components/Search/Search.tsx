import { SearchProps } from '../../types/types';

function Search({ query, setQuery }: SearchProps) {
  return (
    <input
      className='input__large input__large--margin'
      type='text'
      placeholder='Sök meetups...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
