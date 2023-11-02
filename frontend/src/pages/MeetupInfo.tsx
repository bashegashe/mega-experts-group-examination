import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import MeetupLargeCard from '../components/MeetupLargeCard/MeetupLargeCard';
import ReviewList from '../components/ReviewList/ReviewList';
import Menu from '../components/Menu/Menu';
import Loader from '../components/Loader/Loader';

import { getMeetup, postBooking, getMeetupsProfile } from '../services/api';

import { MeetupFullDetail } from '../types/types';

function MeetupInfo() {
  const [meetupDetails, setMeetupDetails] = useState<MeetupFullDetail | null>(null);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [alreadyBookedMeetups, setAlreadyBookedMeetups] = useState([]);
  const [previousMeetups, setPreviousMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentDate = useRef(new Date());
  const navigate = useNavigate();

  const { id } = useParams();

  async function handleSubmit(id: string) {
    try {
      const response = await postBooking(id);
      if (response.success) {
        navigate('/profile');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setIsLoading(true);
          const data = await getMeetup(id);

          if (data.success) {
            setMeetupDetails(data.data.meetup);
          }

          if (data.error === 'Token in cookie is missing' || data.error === 'jwt expired') {
            navigate('/login');
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    const fetchedBookedMeetups = async () => {
      const data = await getMeetupsProfile();
      if (data.success === true) {
        const upcomingMeetupIds = data.data.upcomingMeetups.map((meetup: MeetupFullDetail) => meetup.id);
        const previousMeetupIds = data.data.oldMeetups.map((meetup: MeetupFullDetail) => meetup.id);

        setAlreadyBookedMeetups(upcomingMeetupIds);
        setPreviousMeetups(previousMeetupIds);
      }
    };

    fetchedBookedMeetups();
  }, []);

  useEffect(() => {
    if (meetupDetails && meetupDetails.capacity && meetupDetails.attendees) {
      const seats = meetupDetails.capacity - meetupDetails.attendees.length;
      setAvailableSeats(seats);
    }
  }, [meetupDetails]);

  return (
    <main className='main'>
      <h3 className='main__title'>Meetup Detaljer</h3>
      {isLoading && <Loader />}
      {meetupDetails ? (
        <>
          <MeetupLargeCard
            key={meetupDetails.id}
            id={meetupDetails.id}
            title={meetupDetails.title}
            description={meetupDetails.description}
            category={meetupDetails.category}
            date={meetupDetails.date}
            host={meetupDetails.host}
            location={meetupDetails.location}
            rating={meetupDetails.rating}
          />
          <section>
            <p className='details__desc'>{meetupDetails.description}</p>
            <aside className='details__aside'>
              <p className='details__subtitle'>
                <strong> Max platser:</strong> <span>{meetupDetails.capacity}</span>
              </p>
              <p className='details__subtitle'>
                <strong>Lediga platser: </strong>
                <span>{typeof availableSeats === 'number' ? availableSeats : 'N/A'}</span>
              </p>
            </aside>
          </section>

          <button
            className='button__large'
            onClick={() => {
              if (new Date(meetupDetails.date) < currentDate.current) {
                return alert('Meetup har redan varit.');
              } else if (alreadyBookedMeetups.includes(meetupDetails.id as never)) {
                return alert('Du är redan bokad!');
              } else if (availableSeats === 0) {
                return alert('Fullbokat!');
              } else {
                handleSubmit(meetupDetails.id);
              }
            }}
          >
            {new Date(meetupDetails.date) < currentDate.current
              ? 'Meetup har redan varit!'
              : alreadyBookedMeetups.includes(meetupDetails.id as never)
              ? 'Du är redan bokad!'
              : availableSeats === 0
              ? 'Fullbokat!'
              : 'Jag vill besöka denna meetup!'}
          </button>

          <h3 className='main__title margin--top'>Recensioner</h3>
          <ReviewList reviews={meetupDetails.reviews} />

          {new Date(meetupDetails.date) < currentDate.current &&
          previousMeetups.includes(meetupDetails.id as never) ? (
            <Link className='button__review button__filter--green' to={`/reviews/${id}`}>
              Betygsätt och recensera
            </Link>
          ) : (
            <p className='details__subtitle'>
              För att kunna skapa en recension måste du ha deltagit i mötet, och mötet måste redan ha ägt rum.
            </p>
          )}
        </>
      ) : null}

      <Menu />
    </main>
  );
}

export default MeetupInfo;
