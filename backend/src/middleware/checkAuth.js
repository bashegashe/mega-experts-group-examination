import { sendResponse } from '@/responses';
import Utils from '@/utils';
import Models from '@/models';

const checkAuth = () => ({
  before: async (req) => {
    try {
      const token = Utils.cookie.getCookie(req.event.cookies, 'token');
      if (!token) {
        return sendResponse(400, 'Token in cookie is missing');
      }

      const decode = Utils.token.verifyToken(token);
      const user = await Models.User.getUser(decode.username);
      if (!user) {
        return sendResponse(400, 'Token in cookie is invalid');
      }

      const {
        PK, SK, GSI1PK, GSI1SK, password, ...rest
      } = user;
      req.event.user = rest; // user = { username, id }

      return req.response;
    } catch (error) {
      return sendResponse(401, error.message);
    }
  },
});

export default checkAuth;
