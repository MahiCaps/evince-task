import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  },
  debug: true,
  log: {
    warn(message) {
      console.log("message--", message);
    },
    error(message) {
      // eslint-disable-next-line no-console
      console.log("err", message);
    },
    deprecate(message) {},
    debug(message) {
      console.log(message);
    },
  },
});

module.exports = db;
