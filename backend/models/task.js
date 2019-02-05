'use strict';

module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('task', {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.INTEGER
    },
  });

  Task.associate = function(models) {
    Task.belongsToMany(models.label, {through: 'task_label_mapper'});
  }

  return Task;
}