// config/config.js
require("dotenv").config(); // Untuk memuat variabel lingkungan dari file .env

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "username",
    password: process.env.DB_PASSWORD || "password",
    database: "edusource",
    host: "localhost",
    dialect: "mysql",
  },
  // Anda dapat menambahkan konfigurasi untuk environment lain seperti test dan production
};
