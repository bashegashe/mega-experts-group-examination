import Services from '@/services';

export async function getMeetups() {
  const params = {
    TableName: process.env.TABLE_NAME,
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :pk',
    ExpressionAttributeValues: {
      ':pk': 'MEETUPS',
    },
  };

  const { Items } = await Services.db.query(params).promise();

  return Items;
}

export async function getMeetup(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      PK: `MEETUP#${id}`,
      SK: `MEETUP#${id}`,
    },
  };

  const { Item } = await Services.db.get(params).promise();

  return Item;
}
