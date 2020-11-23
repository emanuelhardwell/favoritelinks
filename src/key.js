/*
 */

module.exports = {
  database: {
    /* connectionLimit: 10, */
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
  },
};
