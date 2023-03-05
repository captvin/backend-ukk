'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemesanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_tamu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_tamu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tgl_pesan: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tgl_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tgl_out: {
        allowNull: false,
        type: Sequelize.DATE
      },
      qty: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      id_tipe: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tipes",
          key: "id"
        }
      },
      status_pesan: {
        allowNull: false,
        type: Sequelize.ENUM('baru','C-in','C-out')
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
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
    await queryInterface.dropTable('pemesanans');
  }
};