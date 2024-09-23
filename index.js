const express = require("express");
const bodyParser = require("body-parser");
const db = require("./connection"); // Pastikan ini merujuk ke koneksi database Anda
const response = require("./response"); // Pastikan ini berfungsi dengan baik

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  response(200, "ini data", "ini message", res);
});

// Get all siswa
app.get("/Getsiswa", (req, res) => {
  const sql = "SELECT * FROM siswa";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).send("Database query error");
      return;
    }
    res.status(200).json({
      status: 200,
      data: results,
      message: "Data retrieved successfully",
    });
  });
});

// Get siswa by nim
app.get("/siswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = "SELECT * FROM siswa WHERE nim = ?";
  db.query(sql, [nim], (err, fields) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    response(200, fields, "GET DETAIL SISWA", res);
  });
});

// Post data siswa
app.post("/siswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  console.log(req.body); // Logging request body untuk debugging

  const sql =
    "INSERT INTO siswa (nim, nama_lengkap, kelas, alamat) VALUES (?, ?, ?, ?)";

  db.query(sql, [nim, namaLengkap, kelas, alamat], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        payload: "invalid",
        message: "Error inserting data",
        metadata: {
          prev: "",
          next: "",
          current: "",
        },
      });
    }

    if (result.affectedRows) {
      const data = {
        idSuccess: result.affectedRows,
        id: result.insertId,
      };

      return res.status(200).json({
        payload: data,
        message: "Data Added Successfully",
        metadata: {
          prev: "",
          next: "",
          current: "",
        },
      });
    }
  });
});

// Update data siswa
app.put("/siswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const { namaLengkap, kelas, alamat } = req.body;

  const sql =
    "UPDATE siswa SET nama_lengkap = ?, kelas = ?, alamat = ? WHERE nim = ?";
  db.query(sql, [namaLengkap, kelas, alamat, nim], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error updating data" });
    }

    if (result.affectedRows) {
      return res.status(200).json({
        message: `Data siswa dengan nim ${nim} berhasil diperbarui`,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Siswa dengan nim ${nim} tidak ditemukan` });
    }
  });
});

// Delete data siswa
app.delete("/siswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = "DELETE FROM siswa WHERE nim = ?";

  db.query(sql, [nim], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error deleting data" });
    }

    if (result.affectedRows) {
      return res
        .status(200)
        .json({ message: `Data siswa dengan nim ${nim} berhasil dihapus` });
    } else {
      return res
        .status(404)
        .json({ message: `Siswa dengan nim ${nim} tidak ditemukan` });
    }
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
