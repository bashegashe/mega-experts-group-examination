import { useState } from 'react';

import { StarRatingProps } from '../../types/types';
import StarItem from './StarItem';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

function StarRating({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  defaultRating = 0,
  messages = [],
  onChange,
  viewOnly = false,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    setRating(rating);
    // onSetRating(rating)
    if (onChange) onChange(rating);
  }

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => (
          <StarItem
            key={index}
            onRate={() => !viewOnly && handleRating(index + 1)}
            full={rating ? rating >= index + 1 : rating >= index + 1}
            onHoverIn={() => !viewOnly && setTempRating(index + 1)}
            onHoverOut={() => !viewOnly && setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}

export default StarRating;
