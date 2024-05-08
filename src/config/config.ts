import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  env: process.env.NODE_ENV || 'development',
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 8000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost:5467',
    port: parseInt(process.env.DB_PORT, 10) || 5462,
    name: process.env.DB_NAME || 'verceldb',
    user: process.env.DB_USERNAME || 'default',
    password: process.env.DB_PASSWORD || 'mGpl4xbjP6MB',
    type: 'postgres',
  },
  jwt: {
    tokenSecret: process.env.JWT_SECRET || 'yourSecretKey',
  },
  awsCredentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
}));
