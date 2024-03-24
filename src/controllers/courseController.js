const { validateCourse } = require("../schemas/courseSchema");
const { validateLesson } = require("../schemas/lessonSchema");
const CourseSerializer = require("../serializers/CourseSerializer");
const CoursesSerializer = require("../serializers/CoursesSerializer");
const LessonSerializer = require("../serializers/LessonSerializer");
const courseService = require("../services/courseService");
const { ROLES } = require("../config/constants");

const getAllCourse = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    req.isUserAuthorized(id);

    if (role === ROLES.admin) {
      const { courses, Course } = await courseService.getAllCoursesforAdmin(
        req.pagination
      );
      return res
        .status(200)
        .json(
          new CoursesSerializer(courses, await req.getPaginationInfo(Course))
        );
    }

    if (role === ROLES.estudiante) {
      const { courses, Course } = await courseService.getAllCoursesforEst(
        req.pagination,
        id
      );
      return res
        .status(200)
        .json(
          new CoursesSerializer(courses, await req.getPaginationInfo(Course))
        );
    }
  } catch (err) {
    next(err);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    req.isUserAuthorized(id);

    req.isRole(ROLES.admin);

    const dataBody = req.body;

    const result = validateCourse(dataBody);

    if (result.error) {
      return res
        .status(422)
        .json({ message: JSON.parse(result.error.message) });
    }

    const dataCourse = await courseService.createCourse(result.data);

    return res.status(201).json(new CourseSerializer(dataCourse));
  } catch (err) {
    next(err);
  }
};

const getCourseDetail = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    req.isUserAuthorized(id);
    
    if (role === ROLES.admin) {
      const { courseId } = req.params;

      const course = await courseService.getCourseDetail(courseId);

      if (!course) return res.status(404).json({ message: "Course no found" });

      return res.status(200).json(new CourseSerializer(course));
    }

    if (role === ROLES.estudiante) {
      const { courseId } = req.params;

      const course = await courseService.getCourseDetailAll(courseId);

      if (!course) return res.status(404).json({ message: "Course no found" });

      return res.status(200).json(new CourseSerializer(course));
    }
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    req.isUserAuthorized(id);

    req.isRole(ROLES.admin);

    const { courseId } = req.params;

    const course = await courseService.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({ mesage: "Course not found" });
    }

    const dataBody = req.body;

    const result = validateLesson(dataBody);

    if (result.error) {
      return res.status(422).json({ mesage: JSON.parse(result.error.message) });
    }

    const dataLesson = await courseService.addLessonToCourse(course, dataBody);

    return res.status(201).json(new LessonSerializer(dataLesson));
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    req.isUserAuthorized(id);

    req.isRole(ROLES.admin);
    
    const { courseId } = req.params;

    const course = await courseService.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const progressCourse = await course.getProgressCourse();

    if (progressCourse) {
      return res.status(405).json({ message: "Course cannot be deleted" });
    }

    await courseService.deleteCourse(course);

    return res.status(204).json({ message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetail,
  getAllCourse,
};
