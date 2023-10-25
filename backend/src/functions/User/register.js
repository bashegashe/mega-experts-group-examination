import { sendResponse } from '@/responses';
import { DbError } from '@/errors';
import Services from '@/services';
import Schemas from '@/schemas';
import Models from '@/models';

const registerHandler = async (event) => {
  const { username, password } = event.body;

  try {
    await Models.User.createUser(username, password);
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      throw new DbError(error.code, 'Username already exists');
    }
    throw error;
  }

  return sendResponse(200);
};

export const handler = Services.middyfy(registerHandler, Schemas.authSchema);
