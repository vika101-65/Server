const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const People = sequelize.define('people', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
});

const Recipe = sequelize.define('recipe', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false},
});

People.hasMany(Recipe);
Recipe.belongsTo(People);

module.exports ={
  People,
  Recipe
}