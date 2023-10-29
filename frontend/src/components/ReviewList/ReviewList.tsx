import { BackendReview, MeetupFullDetail } from "../../types/types";
import MeetupSmallCard from "../MeetupSmallCard/MeetupSmallCard";
import { BASE_URI } from "../../utils/constants";
const templateImg = `${BASE_URI}templateSmall.svg`;

export default function ReviewList({reviews}: {reviews: MeetupFullDetail['reviews']}) {
  return (
    <div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review: BackendReview) => (
          <div className='review' key={review.userId}>
            <MeetupSmallCard
              id={review.userId}
              title={review.author}
              description={review.review || ''}
              templateImg={templateImg}
              rating={review.rating}
              type='Review'
            />
          </div>
        ))
      ) : <p className='main__text'>Inga recensioner än.</p>}
    </div>
  )
}