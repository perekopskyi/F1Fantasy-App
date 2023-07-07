import { config } from 'dotenv';
config();

export const GMAIL = {
  USER: process.env.GMAIL_USER,
  PASSWORD: process.env.GMAIL_PASSWORD,
};
