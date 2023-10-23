import { ApiError } from '@/errors';
import Schemas from '@/schemas';
import Services from '@/services';
import Utils from '@/utils';
import Models from '@/models';

const login = async (event) => {
  const { username, password } = event.body;

  const user = await Models.User.getUser(username);

  if (!user || !Utils.bcrypt.checkPassword(password, user.password)) {
    throw new ApiError(400, 'Incorrect username and/or password');
  }

  return Utils.cookie.sendCookie(Utils.token.generateToken({
    username,
  }));
};

export const handler = Services.middyfy(login, Schemas.authSchema);
