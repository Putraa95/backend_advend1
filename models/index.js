const { Sequelize } = require("sequelize");
const config = require("../config/config");

// Konfigurasi database
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

// Mengimpor model
const Siswa = require("./siswa")(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Siswa,
};

module.exports = db;
