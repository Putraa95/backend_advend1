MISION10 - BACK END 1 ADVEND 

Penggunaan API CRUD

1. GET Semua Data Siswa
   
Endpoint: /siswa
Method: GET
Deskripsi: Mendapatkan semua data siswa.

Response:
{
  "status": 200,
  "data": [...],
  "message": "Data retrieved successfully"
}

2. GET Siswa Berdasarkan NIM
   
Endpoint: /siswa/:nim
Method: GET
Deskripsi: Mendapatkan data siswa berdasarkan NIM.
Response:
{
  "status": 200,
  "data": {...},
  "message": "Data retrieved successfully"
}

3.Tambah Siswa Baru
   
Endpoint: /siswa
Method: POST
Deskripsi: Menambahkan siswa baru.
Body (JSON):

{
  "nim": "12345",
  "namaLengkap": "Nama Siswa",
  "kelas": "Kelas",
  "alamat": "Alamat"
}
Response:

{
  "status": 201,
  "message": "Data siswa berhasil ditambahkan",
  "data": {...}
}

4. Update Data Siswa
   
Endpoint: /siswa/:nim
Method: PUT
Deskripsi: Memperbarui data siswa berdasarkan NIM.

{
  "namaLengkap": "Nama Baru",
  "kelas": "Kelas Baru",
  "alamat": "Alamat Baru"
}
Response:

{
  "message": "Data siswa dengan NIM 12345 berhasil diperbarui"
}

5. Hapus Siswa
   
Endpoint: /siswa/:nim
Method: DELETE
Deskripsi: Menghapus data siswa berdasarkan NIM.
Response:

{
  "message": "Data siswa dengan NIM 12345 berhasil dihapus"
}

