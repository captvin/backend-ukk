'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pemesanan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "pemesanans",
          key: "id"
        }
      },
      id_kamar: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "kamars",
          key: "id"
        }
      },
      harga: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tgl_terisi:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('details');
  }
};