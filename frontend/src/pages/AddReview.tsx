import { useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import { getMeetup } from "../services/api";
import { useEffect, useState } from "react";
import { MeetupFullDetail } from "../types/types";
import Loader from "../components/Loader/Loader";
import MeetupLargeCard from "../components/MeetupLargeCard/MeetupLargeCard";
import ReviewForm from "../components/ReviewForm/ReviewForm";

export default function Reviews() {
  const { meetupId } = useParams();
  const navigate = useNavigate();

  const [meetup, setMeetup] = useState<MeetupFullDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMeetup = async () => {
      if (meetupId && meetupId.length === 36) {
        const response = await getMeetup(meetupId);

        if (response.success === true) {
          setMeetup(response.data.meetup);
        }
        if (response.error === 'Token in cookie is missing' || response.error === 'jwt expired') {
          navigate('/login');
        }

        setIsLoading(false);
      }
    };

    fetchMeetup();
  }, [navigate, meetupId]);

  if (!meetupId || meetupId.length !== 36 || (!isLoading && !meetup)) {
    return (
      <main className='main'>
        <h3 className='main__title'>Recensioner</h3>
        <Menu />
        <p className='main__text'>Meetup kunde inte hittas.</p>
      </main>
    );
  }

  return (
    <main className='main'>
      <h3 className='main__title'>Ny recension</h3>
      <Menu />
      {meetup && <MeetupLargeCard {...meetup} />}
      {!isLoading && <hr style={{marginBottom: '1.3rem'}} />}
      {meetup && <ReviewForm reviews={meetup.reviews} meetupId={meetup.id} />}
      {isLoading && <Loader />}
    </main>
  );
}