export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
  },
});
