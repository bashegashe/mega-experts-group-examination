import { FilterButtonProps } from '../../../types/types';

function FilterButton({ data, className, handleFilterChange, target, filters }: FilterButtonProps) {
  const isDataInFilters = filters.some((filter) => filter[target] === data);

  const buttonClass = `button__filters ${className}${isDataInFilters ? ' button__filters--active' : ''}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleFilterChange(event, data);
  };

  return (
    <button className={buttonClass} onClick={handleClick} value={target}>
      + {data}
    </button>
  );
}

export default FilterButton;
