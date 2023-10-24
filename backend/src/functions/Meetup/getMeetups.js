import Services from '@/services';
import Models from '@/models';
import Middleware from '@/middleware';
import { sendResponse } from '@/responses';

const getMeetups = async () => {
  const meetups = await Models.Meetup.getMeetups();

  return sendResponse(200, {
    meetups: meetups.map(({
      PK, SK, GSI1PK, GSI1SK, ...rest
    }) => rest),
  });
};

export const handler = Services.middyfy(getMeetups).use(Middleware.checkAuth());
