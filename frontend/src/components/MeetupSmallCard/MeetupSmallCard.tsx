import './MeetupSmallCard.css';
import { Link } from 'react-router-dom';

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
}: {
  title: string;
  description: string;
  id: string;
  templateImg: string;
  showButton: boolean;
  handleDeleteBooking: (id: string) => void;
}) {
  return (
    <article className='card__small'>
      <img className='card__img' src={templateImg} alt='Meetup Image' />
      <section className='card__details'>
        <h5 className='card__title'>{title}</h5>
        <p className='card__subtitle'>{description.split(' ').slice(0, 3).join(' ')}...</p>
      </section>

      {showButton && (
        <button className='button__cancel button__cancel--margin' onClick={() => handleDeleteBooking(id)}>
          Avboka
        </button>
      )}
      <button className='card__link'>
        <Link to={`/meetup/${id}`} className='card__link'>
          <img src={arrowSvg} alt='Link to meetup details.' />
        </Link>
      </button>
    </article>
  );
}

export default MeetupSmallCard;
