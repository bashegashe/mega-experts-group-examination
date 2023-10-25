import './MeetupSmallCard.css';

function MeetupSmallCard({
  meetupEvent,
  templateImg,
}: {
  meetupEvent: { title: string; location: string; category: string; meetUpId: number; timestamp: string };
  templateImg: string;
}) {
  // console.log(meetupEvent);
  return (
    <article className='card__small'>
      <img className='card__img' src={templateImg} alt='Meetup Image' />
      <section>
        <h5>{meetupEvent.title}</h5>
        <p>
          Plats:<span>{meetupEvent.location}</span>
        </p>
        <p>
          Tid:<span>{meetupEvent.timestamp}</span>
        </p>
      </section>
      <button className='button__cancel'>Avboka</button>
    </article>
  );
}

export default MeetupSmallCard;
import './MeetupSmallCard.css';
