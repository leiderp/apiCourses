'use strict';
const {
  Model
} = require('sequelize');

const { STATES } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  class progressCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      progressCourse.belongsTo(models.Course, {
        as: "course",
        foreignKey: 'courseId',
        target_key: 'courseId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      progressCourse.belongsTo(models.User, {
        as: "user",
        foreignKey: 'userId',
        target_key: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  progressCourse.init({
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      field: 'course_id',
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      values: Object.values(STATES),
      defaultValue: STATES.pendiente,
    },
    approvalDate: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: 'progressCourse',
  });
  return progressCourse;
};