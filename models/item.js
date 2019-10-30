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