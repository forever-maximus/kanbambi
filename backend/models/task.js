'use strict';

module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('task', {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  });

  return Task;
}