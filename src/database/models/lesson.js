'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Course, {
        as: "course",
        foreignKey: 'courseId',
        target_key: 'courseId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Lesson.hasOne(models.progressLesson, {
        as: "progressLesson",
        foreignKey: 'lessonId'
      });
    }
  }
  Lesson.init({
    lessonId:{
      type: DataTypes.UUID,
      field: "lesson_id",
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    linkVideo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId:{
      type: DataTypes.UUID,
      field: 'course_id',
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Lesson',
  });
  return Lesson;
};