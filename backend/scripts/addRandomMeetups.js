import crypto from 'crypto';
import dynamodb from 'aws-sdk/clients/dynamodb.js';
import 'dotenv/config';

const { DocumentClient } = dynamodb;
const db = new DocumentClient({
  region: process.env.AWS_REGION,
});

const generateMeetup = () => {
  const id = crypto.randomUUID();

  const PK = `MEETUP#${id}`;
  const SK = `MEETUP#${id}`;

  return {
    PK,
    SK,
    title: `Träff i ${['Stockholm', 'Göteborg', 'Malmö'][Math.floor(Math.random() * 3)]}`,
    host: `${['Erik', 'Anna', 'Lars', 'Karin'][Math.floor(Math.random() * 4)]} Svensson`,
    timestamp: new Date().toISOString(),
    location: `${['Vasaparken', 'Slottsskogen', 'Ribersborgsstranden'][Math.floor(Math.random() * 3)]}`,
    description: 'En trevlig träff för att umgås och njuta av god mat och sällskap.',
    rating: Math.floor(Math.random() * 5) + 1,
    capacity: Math.floor(Math.random() * 50) + 10,
    'GSI1-PK': 'MEETUPS',
    'GSI1-SK': PK,
    category: `${['Matlagningskurs', 'Bokklubb', 'Sportevent'][Math.floor(Math.random() * 3)]}`,
    id,
  };
};

const meetups = [
  generateMeetup(), generateMeetup(), generateMeetup(), generateMeetup(), generateMeetup(),
];

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
