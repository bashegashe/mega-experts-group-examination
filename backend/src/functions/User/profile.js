import Services from '@/services';
import Models from '@/models';
import Middleware from '@/middleware';
import { sendResponse } from '@/responses';

const profile = async (event) => {
  const meetups = await Models.Meetup.getProfile(event.user.id);
  return sendResponse(200, meetups);
};

export const handler = Services.middyfy(profile).use(Middleware.checkAuth());
