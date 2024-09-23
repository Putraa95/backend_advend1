// models/siswa.js
module.exports = (sequelize, DataTypes) => {
  const Siswa = sequelize.define(
    "Siswa",
    {
      nim: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Tambahkan atribut lain sesuai kebutuhan
    },
    {
      tableName: "siswa",
      timestamps: false,
    }
  );

  return Siswa;
};
