import { FilterButtonProps } from '../../../types/types';

function FilterButton({ data, className, onFilterChange, target, filters }: FilterButtonProps) {
  const isDataInFilters = filters.locations.includes(data) || filters.categories.includes(data);
  const content = isDataInFilters ? '-' : '+';

  const buttonClass = `button__filters ${className}${isDataInFilters ? ' button__filters--active' : ''}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onFilterChange(event, data);
  };

  return (
    <button className={buttonClass} onClick={handleClick} value={target}>
      {content} {data}
    </button>
  );
}

export default FilterButton;
