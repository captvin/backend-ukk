'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail,{
        foreignKey: "id_pemesanan",
        as: "pemesanan_detail"
      })
      this.belongsTo(models.tipe,{
        foreignKey: "id_tipe",
        as: "tipekamar_pemesanan"
      })
      this.belongsTo(models.user,{
        foreignKey: "id_user",
        as: "user_pemesanan"
      })
    }
  }
  pemesanan.init({
    nama_tamu: DataTypes.STRING,
    email_tamu: DataTypes.STRING,
    tgl_pesan: DataTypes.DATEONLY,
    tgl_in: DataTypes.DATEONLY,
    tgl_out: DataTypes.DATEONLY,
    qty: DataTypes.DOUBLE,
    id_tipe: DataTypes.INTEGER,
    status_pesan: DataTypes.ENUM('baru','C-in', 'C-out'),
    id_user:  DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'pemesanan',
  });
  return pemesanan;
};