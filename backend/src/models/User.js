import Services from '@/services';
import Utils from '@/utils';
import crypto from 'crypto';

export async function createUser(username, password) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: username,
      SK: username,
      username,
      password: Utils.bcrypt.hashPassword(password),
      id: crypto.randomUUID(),
    },
    ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(id)',
  };

  await Services.db.put(params).promise();
}

export async function getUser(username) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      PK: username,
      SK: username,
    },
  };

  const { Item } = await Services.db.get(params).promise();

  return Item;
}
