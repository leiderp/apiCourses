const { Op, Sequelize } = require("sequelize");
const { STATES } = require("../config/constants");

const { Course, Lesson } = require("../database/models");

const getAllCoursesforAdmin = async (pagination) => {
  const courses = await Course.findAll({
    ...pagination,
    paranoid: false,
    attributes: {
      exclude: ["deletedAt", "updatedAt", "createdAt", "description"],
    },
    include: {
      association: "lessons",
    },
  });

  return { courses,  Course};
};

const getAllCoursesforEst = async (pagination, userId) => {
  const courses = await Course.findAll({
    ...pagination,
    attributes: {
      exclude: ["deletedAt", "updatedAt", "createdAt", "description"],
    },
    include: [
      {
        association: "lessons",
        include: {
          association: "progressLesson",
          attributes: ["state"],
        },
      },
      {
        association: "progressCourse",
        required: false,
        attributes: ["state"],
        where: {
          userId: userId,
        },
      },
    ],
  });

  return { courses,  Course};
};

const createCourse = async (dataCourse) => {
  if (dataCourse.lessons) {
    const course = await Course.create(dataCourse, {
      include: [
        {
          model: Lesson,
          as: "lessons",
        },
      ],
    });
    return course;
  } else {
    const course = await Course.create(dataCourse);
    return course;
  }
};

const updateCourse = async () => {};

const addLessonToCourse = async (course, lesson) => {
  const createdLesson = course.createLesson(lesson);
  return createdLesson;
};

const getCourseById = async (id) => {
  const course = await Course.findOne({ where: { courseId: id } });
  return course;
};

const getCourseDetailAll = async (id) => {
  const course = await Course.findOne({
    where: {
      courseId: id,
    },
    include: [
      {
        association: "lessons",
        attributes: { exclude: ["deletedAt"] },
        include: [
          {
            association: "progressLesson",
            attributes: ["state"],
          },
        ],
      },
      {
        association: "progressCourse",
        attributes: ["state"],
      },
    ],
  });
  return course;
};

const getCourseDetail = async (id) => {
  const course = await Course.findOne({
    where: {
      courseId: id,
    },
    paranoid: false,
    include: {
      association: "lessons",
      paranoid: false,
    },
  });
  return course;
};

const deleteCourse = async (course) => {
  course.destroy();
};

module.exports = {
  createCourse,
  updateCourse,
  getCourseById,
  addLessonToCourse,
  deleteCourse,
  getCourseDetailAll,
  getCourseDetail,
  getAllCoursesforAdmin,
  getAllCoursesforEst,
};
