import Services from '@/services';
import Models from '@/models';
import Middleware from '@/middleware';
import { sendResponse } from '@/responses';
import Utils from '@/utils';

const getMeetups = async () => {
  const meetups = await Models.Meetup.getMeetups();

  return sendResponse(200, {
    meetups: meetups.map((meetup) => Utils.prepareItem(meetup)),
  });
};

export const handler = Services.middyfy(getMeetups).use(Middleware.checkAuth());
