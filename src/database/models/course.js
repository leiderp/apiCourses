'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {

    static associate(models) {
      Course.hasMany(models.Lesson, {
        as: "lessons",
        foreignKey: 'courseId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Course.hasOne(models.progressCourse, {
        as: "progressCourse",
        foreignKey: 'courseId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Course.init({
    courseId: {
      type: DataTypes.UUID,
      field: "course_id",
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    publicationDate: {
      type: DataTypes.DATE,
      field: 'publication_date',
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    introVideo: {
      type: DataTypes.STRING,
      field: 'intro_video',
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
    modelName: 'Course',
    hooks: {
      afterDestroy: function (instance, options) {
          instance.getLessons().then(lessons=> lessons?.map((lesson) => {
            lesson.destroy();
          }));
          instance.getProgressCourse().then(progress=> progress?.destroy());
      }
    }
  });
  return Course;
};