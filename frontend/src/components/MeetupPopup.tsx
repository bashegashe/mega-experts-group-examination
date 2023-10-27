//Användaren kan se en beskrivning av meetup:en.
// Användaen kan se antalet platser samt antalet anmälda.
// Användaren kan klicka på en knapp för att anmäla sig.

function MeetupPopup (props:any) {

    const { name, description, freeSlots, numOfParticipants } = props;
    return (
        <div className="info__div">
            <h3>{ name }</h3>
            <p>{ description }</p>
            <p>{ freeSlots }</p>
            <p>{ numOfParticipants }</p>
            <button>Jag vill besöka denna meetup!</button>
        </div>
    )
}

export default MeetupPopup;