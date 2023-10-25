import Services from '@/services';
import Models from '@/models';
import Middleware from '@/middleware';
import { sendResponse } from '@/responses';
import { ApiError } from '@/errors';
import Utils from '@/utils';

const getMeetup = async (event) => {
  const { id } = event.pathParameters;

  if (!id || id.length !== 36) {
    throw new ApiError(400, 'Meetup id missing or invalid');
  }

  const meetup = await Models.Meetup.getMeetup(id);

  if (!meetup) {
    throw new ApiError(404, 'Meetup not found');
  }

  return sendResponse(200, {
    meetup: Utils.prepareItem(meetup),
  });
};

export const handler = Services.middyfy(getMeetup).use(Middleware.checkAuth());
