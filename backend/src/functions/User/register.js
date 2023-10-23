import { sendResponse } from '@/responses';
import { DbError } from '@/errors';
import Services from '@/services';
import Schemas from '@/schemas';
import Utils from '@/utils';

const registerHandler = async (event) => {
  const { username, password } = event.body;

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: username,
      SK: username,
      password: Utils.bcrypt.hashPassword(password),
    },
    ConditionExpression: 'attribute_not_exists(PK)',
  };

  try {
    await Services.db.put(params).promise();
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      throw new DbError(error.code, 'Username already exists');
    }
    throw error;
  }

  return sendResponse(200);
};

export const handler = Services.middyfy(registerHandler, Schemas.authSchema);
