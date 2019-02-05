'use strict';

module.exports = (sequelize, DataTypes) => {
  var Label = sequelize.define('label', {
    name: {
      type: DataTypes.STRING
    },
    colour: {
      type: DataTypes.STRING
    }
  });

  Label.associate = function(models) {
    Label.belongsToMany(models.task, {through: 'task_label_mapper'});
  }

  return Label;
}