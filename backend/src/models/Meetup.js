import { ApiError } from '@/errors';
import Services from '@/services';

async function getAttendees(meetup) {
  const attendees = await Services.db.query({
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `MEETUP#${meetup.id}`,
      ':sk': 'PARTICIPANT#',
    },
  }).promise();

  return attendees.Items.map((item) => item.userId);
}

async function getReviews(meetup) {
  const reviews = await Services.db.query({
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `MEETUP#${meetup.id}`,
      ':sk': 'REVIEW#',
    },
  }).promise();

  return reviews.Items.map((item) => item.userId);
}

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

  await Promise.all(Items.map(async (item) => {
    item.attendees = await getAttendees(item);
    item.reviews = await getReviews(item);
  }));

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

  Item.attendees = await getAttendees(Item);
  Item.reviews = await getReviews(Item);

  return Item;
}

export async function meetupRegistration(meetupId, userId) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: `MEETUP#${meetupId}`,
      SK: `PARTICIPANT#${userId}`,
      userId,
    },
  };

  try {
    await Services.db.put(params).promise();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

export async function addReview(meetupId, review, rating, userId) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: `MEETUP#${meetupId}`,
      SK: `REVIEW#${userId}`,
      review,
      rating,
      userId,
    },
  };

  try {
    await Services.db.put(params).promise();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}
