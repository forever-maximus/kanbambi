'use strict';

module.exports = (sequelize, DataTypes) => {
  var StateColumn = sequelize.define('state_column', {
    name: {
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.INTEGER
    },
  });

  StateColumn.associate = function(models) {
    StateColumn.hasMany(models.task);
  }

  return StateColumn;
}