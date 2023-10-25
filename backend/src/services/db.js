import dynamodb from 'aws-sdk/clients/dynamodb.js';
import 'dotenv/config';

const { DocumentClient } = dynamodb;

const db = new DocumentClient({
  region: process.env.AWS_REGION,
});

export default db;
