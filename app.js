const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./models/index");
const response = require("./response"); // Sesuaikan dengan lokasi file response.js

app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
  response(200, "ini data", "ini message", res);
});

// Get all siswa
app.get("/siswa", async (req, res) => {
  try {
    const siswaList = await db.Siswa.findAll();
    response(200, siswaList, "Success", res);
  } catch (error) {
    response(500, null, "Error fetching data", res);
  }
});

// Get siswa by nim
app.get("/siswa/:nim", async (req, res) => {
  const nim = req.params.nim;
  try {
    const siswa = await db.Siswa.findOne({ where: { nim } });
    if (siswa) {
      response(200, siswa, "Success", res);
    } else {
      response(404, null, "Siswa not found", res);
    }
  } catch (error) {
    response(500, null, "Error fetching data", res);
  }
});

// Post data siswa
app.post("/siswa", async (req, res) => {
  try {
    const { nim, nama_lengkap } = req.body;
    const siswa = await db.Siswa.create({ nim, nama_lengkap });
    response(201, siswa, "Siswa created", res);
  } catch (error) {
    response(500, null, "Error creating siswa", res);
  }
});

// Update data siswa
app.put("/siswa/:nim", async (req, res) => {
  const nim = req.params.nim;
  const { nama_lengkap } = req.body;
  try {
    const [updated] = await db.Siswa.update(
      { nama_lengkap },
      { where: { nim } }
    );
    if (updated) {
      response(200, null, "Siswa updated", res);
    } else {
      response(404, null, "Siswa not found", res);
    }
  } catch (error) {
    response(500, null, "Error updating siswa", res);
  }
});

// Delete data siswa
app.delete("/siswa/:nim", async (req, res) => {
  const nim = req.params.nim;
  try {
    const deleted = await db.Siswa.destroy({ where: { nim } });
    if (deleted) {
      response(200, null, "Siswa deleted", res);
    } else {
      response(404, null, "Siswa not found", res);
    }
  } catch (error) {
    response(500, null, "Error deleting siswa", res);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
