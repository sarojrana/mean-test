module.exports = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_AUTH_SOURCE: process.env.DB_AUTH_SOURCE,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  SECRET: process.env.SECRET
};
