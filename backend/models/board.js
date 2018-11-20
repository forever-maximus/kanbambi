'use strict';

module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('board', {
    name: {
      type: DataTypes.STRING
    }
  });

  return Board;
}