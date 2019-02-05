'use strict';

module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('board', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Board.associate = function(models) {
    Board.hasMany(models.state_column);
    Board.hasMany(models.label);
  }

  return Board;
}