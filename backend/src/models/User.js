import Services from '@/services';

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
