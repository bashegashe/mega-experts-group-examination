import './meetUpLarge.css';

import { Link } from 'react-router-dom';

import StarRating from '../StarRating/StarRating';
import { BASE_URI } from '../../utils/constants';
import { MeetupFullDetail } from '../../types/types';

const arrowSvg = `${BASE_URI}arrow-right.svg`;
const templateImg = `${BASE_URI}templateSmall.svg`;

function MeetupLargeCard({ title, host, location, id, date, rating, category }: MeetupFullDetail) {
  // Flytta till utils.
  const dateStamp = new Date(date);
  const year = dateStamp.getFullYear();
  const month = String(dateStamp.getMonth() + 1).padStart(2, '0'); // Månaden är nollbaserad, därför +1 och formaterad med två siffror
  const day = String(dateStamp.getDate()).padStart(2, '0');
  const hours = String(dateStamp.getHours()).padStart(2, '0');
  const minutes = String(dateStamp.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return (
    <article className='card__large'>
      <img className='card__img--large' src={templateImg} alt='Meetup Image' />
      <aside className='card__container'>
        <section className='card__details'>
          <h5 className='card__title'>{title}</h5>
          <div className='card__text'>
            <p className='card__subtitle'>
              <strong> Kategori:</strong> <span>{category}</span>
            </p>
          </div>
          <div className='card__text'>
            <p className='card__subtitle '>
              <strong> Värd:</strong> <span>{host}</span>
            </p>
          </div>
          <div className='card__text'>
            <p className='card__subtitle'>
              <strong>Tid:</strong> <span>{formattedDate}</span>
            </p>
          </div>
          <div className='card__text'>
            <p className='card__subtitle'>
              <strong> Plats:</strong> <span>{location}</span>
            </p>
          </div>
          <StarRating
            // onSetRating={onSetRating}
            size={20}
            maxRating={5}
            defaultRating={rating}
            viewOnly
          />
        </section>
        <button className='card__large--link'>
          <Link to={`/meetups/${id}`} className='card__link'>
            <img src={arrowSvg} alt='Link to meetup details.' />
          </Link>
        </button>
      </aside>
    </article>
  );
}

export default MeetupLargeCard;
