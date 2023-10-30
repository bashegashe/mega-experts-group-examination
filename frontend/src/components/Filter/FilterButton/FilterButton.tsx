interface FilterButtonProps {
  data: string;
  className: string;
  handleFilterChange: (event: React.MouseEvent<HTMLButtonElement>, data: string) => void;
  target: string; // Lägg till target-egenskapen här
  filters: { [key: string]: string }[];
}

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
