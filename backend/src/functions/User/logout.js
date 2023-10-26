import Services from '@/services';
import Utils from '@/utils';
import Middleware from '@/middleware';

export const handler = Services.middyfy(
  () => Utils.cookie.sendDeleteCookie(),
).use(Middleware.checkAuth());
