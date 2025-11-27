import { useState } from 'react';
import { SortType } from '../../enums/sort-options.enum';
import { SORTING_ARROW_SIZE } from '../../const';

type SortOptionsProps = {
  selectedSortType: SortType;
  onSortChange: (sortOption: SortType) => void;
};

export default function SortOptions({selectedSortType, onSortChange}: SortOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleOptionClick = (sortType: SortType) => {
    onSortChange(sortType);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleOpen}
      >
        {selectedSortType}
        <svg className="places__sorting-arrow" width={SORTING_ARROW_SIZE.width} height={SORTING_ARROW_SIZE.height}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortType).map((option) => (
            <li
              key={option}
              className={`places__option`}
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
              style={{fontWeight: option === selectedSortType ? 'bold' : undefined}}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
