
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMeetupInfo } from '../services/api';

import MeetupLargeCard from '../components/MeetupLargeCard/MeetupLargeCard';

function MeetupPopup () {

    const [meetupDetails, setmeetupDetails] = useState ([]);
    const { id } = useParams();

    let allowSubmit:Boolean;

    useEffect (() => {

        const fetchData = async () => {

            try {

                if (id) {

                    const data = await getMeetupInfo(id);

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

        allowSubmit = true;
    }
    else {

        allowSubmit = false;
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
            
            <button disabled onClick={ () => handleClick (meetupDetails) }>Jag vill besöka denna meetup!</button>
        </div>
    )
}

export default MeetupPopup;