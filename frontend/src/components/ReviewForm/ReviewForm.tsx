import { useState } from "react"
import { Meetup } from "../../types/types"
import StarRating from "../StarRating/StarRating"
import { postReview } from "../../services/api";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { Review } from "../../types/types";

const DEFAULT_RATING = 1;

export default function ReviewForm ({meetupId}: {meetupId: Meetup['id']}) {
  const navigate = useNavigate()

  const [rating, setRating] = useState<number>(DEFAULT_RATING)
  const [review, setReview] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addReview = async () => {
    setIsLoading(true);

    const reviewObject: Review = { rating, review };
    if (!review.trim()) delete reviewObject.review;

    const response = await postReview(meetupId, JSON.stringify(reviewObject));

    if (response.success === true) {
      alert('Din recension har sparats')
    } else {
      alert('Något gick fel vid sparandet av recensionen.')
    }
    if (response.error === 'Token in cookie is missing') {
      navigate('/login');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h4 className='main__subtitle'>Ny recension</h4>
      <div className='flex flex-col' style={{gap:'1rem'}}>
        <div className='flex' style={{gap: '1.5rem'}}>
          <div>Betyg</div>
          <StarRating
            size={20}
            maxRating={5}
            defaultRating={DEFAULT_RATING}
            onChange={(rating: number) => setRating(rating)}
          />
        </div>
        <div>
          <div>Recension</div>
          <textarea className='textarea' onChange={(e) => setReview(e.target.value)}></textarea>
        </div>
        {isLoading ? <Loader /> : (
          <button className='button__large' type='submit' onClick={addReview}>
            Skicka
          </button>
        )}
      </div>
    </div>
  )
}