const { DataTypes } = require("sequelize");
const db = require("../config/config");

const Notes = db.define("notes", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Notes;
