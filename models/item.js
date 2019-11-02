'use strict';
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('Item', {
    code: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    lecture: DataTypes.STRING,
    professor: DataTypes.STRING,
    location: DataTypes.STRING,
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    description: DataTypes.STRING(500),
    dayofweek: DataTypes.STRING,
  }, {
    timestamps: true,
    updatedAt:false,
  });
  course.associate = function(models) {
    // associations can be defined here
  };
  return course;
};