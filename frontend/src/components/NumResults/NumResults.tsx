import { MeetupFullDetail } from '../../types/types';

function NumResults({ filteredMeetups }: { filteredMeetups: MeetupFullDetail[] }) {
  const length = filteredMeetups.length;
  return (
    <p>
      Antal sökträffar: <span>{length}</span>
    </p>
  );
}

export default NumResults;
