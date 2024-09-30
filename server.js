// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const siswaRoutes = require("./routes/siswaRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/siswa", siswaRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
