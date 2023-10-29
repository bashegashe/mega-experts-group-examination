import Services from '@/services';
import Models from '@/models';
import Middleware from '@/middleware';
import { sendResponse } from '@/responses';
import { ApiError } from '@/errors';

const meetupUnregistration = async (event) => {
  const { id } = event.pathParameters;

  if (!id || id.length !== 36) {
    throw new ApiError(400, 'Meetup id missing or invalid');
  }

  const meetup = await Models.Meetup.getMeetup(id);

  if (!meetup) {
    throw new ApiError(404, 'Meetup not found');
  }

  if (!meetup.attendees.includes(event.user.id)) {
    throw new ApiError(400, 'You are not in this meetup');
  }

  if (new Date() > new Date(meetup.date)) {
    throw new ApiError(400, 'Meetup already happened');
  }

  await Models.Meetup.meetupUnregistration(meetup, event.user.id);

  return sendResponse(200);
};

export const handler = Services.middyfy(meetupUnregistration).use(Middleware.checkAuth());
