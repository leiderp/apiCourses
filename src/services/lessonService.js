const { Lesson } = require("../database/models");

const createLesson = async (dataLesson) => {
  const lesson = await Lesson.create(dataLesson);
  return lesson;
};

module.exports = {
  createLesson,
};
