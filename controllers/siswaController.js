// controllers/siswaController.js
const db = require("../config/db");
const { siswaValidation } = require("../validation/siswaValidation");

// Ambil semua data siswa
exports.getAllSiswa = async (req, res, next) => {
  try {
    const [results] = await db.query("SELECT * FROM siswa");
    res.status(200).json({
      status: 200,
      data: results,
      message: "Data retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Ambil data siswa berdasarkan NIM
exports.getSiswaByNim = async (req, res, next) => {
  try {
    const nim = req.params.nim;
    const [results] = await db.query("SELECT * FROM siswa WHERE nim = ?", [
      nim,
    ]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
    res.status(200).json({
      status: 200,
      data: results[0],
      message: "Data retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Tambah data siswa baru
exports.addSiswa = async (req, res, next) => {
  try {
    // Validasi input
    const { error } = siswaValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { nim, namaLengkap, kelas, alamat } = req.body;
    const sql =
      "INSERT INTO siswa (nim, nama_lengkap, kelas, alamat) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(sql, [nim, namaLengkap, kelas, alamat]);

    res.status(201).json({
      status: 201,
      message: "Data siswa berhasil ditambahkan",
      data: { id: result.insertId, nim, namaLengkap, kelas, alamat },
    });
  } catch (error) {
    next(error);
  }
};

// Update data siswa by NIM
exports.updateSiswa = async (req, res, next) => {
  try {
    const nim = req.params.nim;
    const { namaLengkap, kelas, alamat } = req.body;

    const sql =
      "UPDATE siswa SET nama_lengkap = ?, kelas = ?, alamat = ? WHERE nim = ?";
    const [result] = await db.query(sql, [namaLengkap, kelas, alamat, nim]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    res
      .status(200)
      .json({ message: `Data siswa dengan NIM ${nim} berhasil diperbarui` });
  } catch (error) {
    next(error);
  }
};

// Hapus data siswa by NIM
exports.deleteSiswa = async (req, res, next) => {
  try {
    const nim = req.params.nim;
    const sql = "DELETE FROM siswa WHERE nim = ?";
    const [result] = await db.query(sql, [nim]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    res
      .status(200)
      .json({ message: `Data siswa dengan NIM ${nim} berhasil dihapus` });
  } catch (error) {
    next(error);
  }
};
