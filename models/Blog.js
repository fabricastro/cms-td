const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Blog;