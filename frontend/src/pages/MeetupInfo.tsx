
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMeetup, registerAttendee } from '../services/api';

function MeetupInfo () {

    const [meetupDetails, setMeetupDetails] = useState ([]);
    const [allowSubmit, setAllowSubmit] = useState(false);

    const { id } = useParams();

    useEffect (() => {

        const fetchData = async () => {

            try {

                if (id) {

                    const data = await getMeetup(id);

                    if (data.success == true) {

                        setMeetupDetails(data.data.meetup);
                    }
                }
            }
            catch (err) {

                console.log(err);
            }
        }

        fetchData();

    }, []);

    // if (meetupDetails.capacity > 0) {

    //     setAllowSubmit(true);
    // }
    // else {

    //     setAllowSubmit(false);
    // } evig loop

    return (
        <main className='main'>
            <h3>{ meetupDetails.title }</h3>
            <p>{ meetupDetails.description }</p>
            {/* <p>Antal besökare: { meetupDetails.attendees.length == 0 ? "Bli först till denna meetup!" : meetupDetails.attendees.length }</p> */}
            <p>Lediga platser: { meetupDetails.capacity }</p>
            <p>Leds av { meetupDetails.host }</p>
            <p>{ meetupDetails.date }</p>
            <p>{ meetupDetails.rating }</p>
            
            <button disabled={ allowSubmit } onClick={ () => registerAttendee (meetupDetails.id) }>Jag vill besöka denna meetup!</button>
            <button><Link to={`/reviews/${id}`}></Link>Recensioner</button>
        </main>
    )
}

export default MeetupInfo;
