
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMeetup, registerAttendee } from '../services/api';

import MeetupLargeCard from '../components/MeetupLargeCard/MeetupLargeCard';

function MeetupInfo () {

    const [meetupDetails, setmeetupDetails] = useState ([]);
    const [allowSubmit, setAllowSubmit] = useState(false);

    const { id } = useParams();

    useEffect (() => {

        const fetchData = async () => {

            try {

                if (id) {

                    const data = await getMeetup(id);

                    if (data.success == true) {

                        setmeetupDetails(data.data.meetup);
                    }
                }
            }
            catch (err) {

                console.log(err);
            }
        }

        fetchData();
    }, []);

    if (meetupDetails.capacity > 0) {

        setAllowSubmit(true);
    }
    else {

        setAllowSubmit(false);
    }

    return (
        <div className="info__div">
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
            <h3>{ meetupDetails.title }</h3>
            <p>{ meetupDetails.description }</p>
            <p>{ meetupDetails.attendees }</p>
            <p>{ meetupDetails.capacity }</p>
            <p>{ meetupDetails.host }</p>
            <p>{ meetupDetails.date }</p>
            <p>{ meetupDetails.rating }</p>
            
            <button disabled={ !allowSubmit } onClick={ () => registerAttendee () }>Jag vill besöka denna meetup!</button>
        </div>
    )
}

export default MeetupInfo;