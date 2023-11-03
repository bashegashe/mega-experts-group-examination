import crypto from 'crypto';
import db from '../src/services/db.js';

const NUMBER_OF_MEETUPS = 5;

const generateMeetup = () => {
  const id = crypto.randomUUID();

  const PK = `MEETUP#${id}`;
  const SK = `MEETUP#${id}`;

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  return {
    PK,
    SK,
    title: `Träff i ${['Stockholm', 'Göteborg', 'Malmö'][Math.floor(Math.random() * 3)]}`,
    host: `${['Erik', 'Anna', 'Lars', 'Karin'][Math.floor(Math.random() * 4)]} Svensson`,
    date: currentDate.toISOString(),
    location: `${['Vasaparken', 'Slottsskogen', 'Ribersborgsstranden'][Math.floor(Math.random() * 3)]}`,
    description: 'En trevlig träff för att umgås och njuta av god mat och sällskap.',
    rating: 0,
    capacity: Math.floor(Math.random() * 50) + 10,
    GSI1PK: 'MEETUPS',
    GSI1SK: PK,
    category: `${['Matlagningskurs', 'Bokklubb', 'Sportevent'][Math.floor(Math.random() * 3)]}`,
    id,
  };
};

const meetups = Array.from({ length: NUMBER_OF_MEETUPS }, generateMeetup);

const requests = meetups.map((meetup) => ({
  PutRequest: {
    Item: meetup,
  },
}));

const params = {
  RequestItems: {
    [process.env.TABLE_NAME]: requests,
  },
};

try {
  await db.batchWrite(params).promise();
  console.log('\nSuccessfully inserted meetups');
} catch (error) {
  console.error('\nError inserting meetups:', error);
}
