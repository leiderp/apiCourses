'use strict';
const {
  Model
} = require('sequelize');

const { STATES } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  class progressLesson extends Model {
    
    static associate(models) {
      progressLesson.belongsTo(models.Lesson, {
        as: "lesson",
        foreignKey: 'lessonId',
        target_key: 'lessonId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      progressLesson.belongsTo(models.User, {
        as: "user",
        foreignKey: 'userId',
        target_key: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  progressLesson.init({
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.UUID,
      field: 'lesson_id',
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      values: Object.values(STATES),
      defaultValue: STATES.pendiente,
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
    modelName: 'progressLesson',
  });
  return progressLesson;
};