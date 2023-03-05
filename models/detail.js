'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.pemesanan,{
        foreignKey: "id_pemesanan",
        as: "pemesanan_detail"
      })
      this.belongsTo(models.kamar,{
        foreignKey: "id_kamar",
        as: "kamar_detail"
      })
    }
  }
  detail.init({
    id_pemesanan: DataTypes.INTEGER,
    id_kamar: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    tgl_terisi: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'detail',
  });
  return detail;
};