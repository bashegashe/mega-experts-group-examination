import Services from '@/services';
import Utils from '@/utils';

export async function createUser(username, password) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: username,
      SK: username,
      password: Utils.bcrypt.hashPassword(password),
    },
    ConditionExpression: 'attribute_not_exists(PK)',
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
