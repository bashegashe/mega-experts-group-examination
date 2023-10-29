function FilterButton({ data, className, handleFilterChange, target }: { data: string; className: string }) {
  const buttonClass = `button__filters ${className}`;

  return (
    <button className={buttonClass} onClick={() => handleFilterChange(event, data)} value={target}>
      + {data}
    </button>
  );
}

export default FilterButton;
