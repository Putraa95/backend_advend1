// routes/siswaRoutes.js
const express = require("express");
const router = express.Router();
const siswaController = require("../controllers/siswaController");

// Mendapatkan semua siswa
router.get("/", siswaController.getAllSiswa);

// Mendapatkan siswa berdasarkan NIM
router.get("/:nim", siswaController.getSiswaByNim);

// Menambahkan siswa baru
router.post("/", siswaController.addSiswa);

// Mengupdate siswa berdasarkan NIM
router.put("/:nim", siswaController.updateSiswa);

// Menghapus siswa berdasarkan NIM
router.delete("/:nim", siswaController.deleteSiswa);

module.exports = router;
