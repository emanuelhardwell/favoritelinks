/*
 */
/* modulo que convierte callBacks a Promesas ...ya que el modulo MYSQL no lo soporta */
const { promisify } = require("util");

const mysql = require("mysql");
const { database } = require("./key");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (connection) connection.release();
  console.log("DB is Connected ........................................");

  return;
});

// promisify pool query --->
pool.query = promisify(pool.query);

module.exports = pool;
