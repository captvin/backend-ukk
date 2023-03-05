'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail,{
        foreignKey: "id_kamar",
        as: "detail"
      })
      this.belongsTo(models.tipe,{
        foreignKey: "id_tipe",
        as: "tipe"
      })
    }
  }
  kamar.init({
    nomor: DataTypes.INTEGER,
    id_tipe: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'kamar',
  });
  return kamar;
};