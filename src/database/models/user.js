"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = require("../../config");

const { ROLES } = require("../../config/constants");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.progressCourse, {
        as: "progressCourse",
        foreignKey: "userId",
      });
      User.hasMany(models.progressLesson, {
        as: "progressLesson",
        foreignKey: "userId",
      });
    }

    comparePassword(plainTextPassword) {
      return bcrypt.compare(plainTextPassword, this.password);
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        field: "user_id",
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(ROLES),
        defaultValue: ROLES.estudiante,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
    }
  );

  const encryptPassword = async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
  };

  User.beforeCreate(encryptPassword);
  User.beforeUpdate(encryptPassword);

  return User;
};
