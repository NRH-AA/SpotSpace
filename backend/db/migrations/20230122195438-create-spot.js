'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const default_picture = 'https://assets.website-files.com/61e2d9500e1bc451a3ea1aa3/629a49e7ab53625cb2c4e791_Brand-pattern.jpg';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      lng: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      zipcode: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      avgRating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      previewImage: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      cleaningFee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      maxGuests: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      amenities: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.dropTable(options);
  }
};
