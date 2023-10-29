import Services from '@/services';
import Models from '@/models';
import Middleware from '@/middleware';
import { sendResponse } from '@/responses';
import { ApiError } from '@/errors';
import reviewSchema from '@/schemas/reviewSchema';

const addReview = async (event) => {
  const { review, rating } = event.body;
  const { id } = event.pathParameters;

  if (!id || id.length !== 36) {
    throw new ApiError(400, 'Meetup id missing or invalid');
  }

  const meetup = await Models.Meetup.getMeetup(id);

  if (!meetup) {
    throw new ApiError(404, 'Meetup not found');
  }

  if (!meetup.attendees.includes(event.user.id)) {
    throw new ApiError(400, 'You cannot review this meetup');
  }

  if (meetup.reviews.find((r) => r.userId === event.user.id)) {
    throw new ApiError(400, 'You have already reviewed this meetup');
  }

  if (new Date() < new Date(meetup.date)) {
    throw new ApiError(400, 'You cannot review a meetup that has not happened yet');
  }

  // if (meetup.attendees.length === meetup.reviews.length) {
  //   throw new ApiError(400, 'All attendees have already reviewed this meetup');
  // }

  await Models.Meetup.addReview(id, review, rating, event.user);

  return sendResponse(200);
};

export const handler = Services.middyfy(addReview, reviewSchema).use(Middleware.checkAuth());
