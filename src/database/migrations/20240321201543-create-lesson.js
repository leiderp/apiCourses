'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, SequelizeSequelize) {
    await queryInterface.createTable('Lessons', {
      lessonId:{
        type: SequelizeSequelize.UUID,
        field: "lesson_id",
        defaultValue: SequelizeSequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: SequelizeSequelize.STRING,
        allowNull: false,
      },
      description: {
        type: SequelizeSequelize.STRING,
      },
      linkVideo: {
        type: SequelizeSequelize.STRING,
        allowNull: false,
      },
      courseId:{
        type: Sequelize.UUID,
        field: 'course_id',
        allowNull: false,
        references: {
          model: 'Course',
          key: 'courseId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lessons');
  }
};