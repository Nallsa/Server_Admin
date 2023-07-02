export const HOST = process.env.HOST;
export const PORT = process.env.HOST;
export const LOGIN = process.env.HOST;
export const PASSWORD = process.env.HOST;

export const DATABASE_URL =
  'postgresql://' +
  LOGIN +
  ':' +
  PASSWORD +
  '@' +
  HOST +
  ':' +
  PORT +
  '/postgres?schema=public';
