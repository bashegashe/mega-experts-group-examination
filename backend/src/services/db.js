import { DocumentClient } from 'aws-sdk/clients/dynamodb.js';

const db = new DocumentClient({
  region: process.env.AWS_REGION,
});

export default db;
