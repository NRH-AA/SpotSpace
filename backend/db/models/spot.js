'use strict';
const { Model } = require('sequelize');

const default_picture = 'https://assets.website-files.com/61e2d9500e1bc451a3ea1aa3/629a49e7ab53625cb2c4e791_Brand-pattern.jpg';

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    
    
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: 'Owner'});
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', as: 'spotImages'});
      Spot.hasMany(models.Review, {foreignKey: 'spotId'});
      Spot.hasOne(models.Booking, {foreignKey: 'spotId'});
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    lng: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {len: [5, 500]}
    },
    price: {
      type:DataTypes.FLOAT,
      allowNull: false
    },
    avgRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    previewImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
