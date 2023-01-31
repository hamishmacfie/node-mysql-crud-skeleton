const { Sequelize } = require("sequelize");

const dbConn = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
  }
);

dbConn
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been establised");
  })
  .catch((err) => console.error("Unable to connect to the database"));

module.exports = dbConn;
