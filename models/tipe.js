'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan,{
        foreignKey: "id_tipe",
        as: "tipekamar_pemesanan"
      })
      this.hasMany(models.kamar,{
        foreignKey: "id_tipe",
        as: "kamar"
      })
    }
  }
  tipe.init({
    nama_tipe: DataTypes.STRING,
    harga: DataTypes.DOUBLE,
    deskripsi: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipe',
  });
  return tipe;
};