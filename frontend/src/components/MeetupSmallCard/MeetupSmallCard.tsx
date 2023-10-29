import './MeetupSmallCard.css';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import { BASE_URI } from '../../utils/constants';
// const arrowSvg = `/arrow-right.svg`;
const arrowSvg = `${BASE_URI}arrow-right.svg`;

function MeetupSmallCard({
  title,
  description,
  id,
  templateImg,
  showButton,
  handleDeleteBooking,
  rating,
  type = 'Meetup',
}: {
  title: string;
  description: string;
  id: string;
  templateImg: string;
  showButton?: boolean;
  handleDeleteBooking?: (id: string) => void;
  rating?: number;
  type?: 'Meetup' | 'Review';
}) {
  return (
    <article className='card__small'>
      <img className='card__img' src={templateImg} alt='Meetup Image' />
      <section className='card__details'>
        <h5 className='card__title'>{title}</h5>
        {type === 'Meetup' && <p className='card__subtitle'>{description.split(' ').slice(0, 3).join(' ')}...</p>}
        {type === 'Review' && (
          <>
            <p className='card__subtitle'>{description}</p>
            <StarRating size={20} maxRating={5} defaultRating={rating} viewOnly />
          </>
        )}
      </section>

      {showButton && (
        <button className='button__cancel button__cancel--margin' onClick={() => handleDeleteBooking?.(id)}>
          Avboka
        </button>
      )}
      {type === 'Meetup' && (
        <button className='card__link'>
        <Link to={`/meetup/${id}`} className='card__link'>
          <img src={arrowSvg} alt='Link to meetup details.' />
        </Link>
      </button>
      )}
    </article>
  );
}

export default MeetupSmallCard;
