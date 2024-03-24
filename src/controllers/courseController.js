const { validateCourse } = require("../schemas/courseSchema");
const { validateLesson } = require("../schemas/lessonSchema");
const CourseSerializer = require("../serializers/CourseSerializer");
const CoursesSerializer = require("../serializers/CoursesSerializer");
const LessonSerializer = require("../serializers/LessonSerializer");
const courseService = require("../services/courseService");

const getAllCourse = async (req, res, next) => {
    
    const role = "Admin";

    if(role === "Admin"){
        const { courses, Course } = await courseService.getAllCoursesforAdmin(req.pagination );
        return res.status(200).json(new CoursesSerializer(courses, await req.getPaginationInfo(Course)));
    }

    if(role === "Estudiante"){
        const { courses, Course } = await courseService.getAllCoursesforEst(123);
        return res.status(200).json(new CoursesSerializer(courses, await req.getPaginationInfo(Course)));
    }
};

const createCourse = async (req, res, next) => {
  const dataBody = req.body;

  const result = validateCourse(dataBody);

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const dataCourse = await courseService.createCourse(result.data);

  return res.status(201).json(new CourseSerializer(dataCourse));
};

const getCourseDetail = async (req, res, next) => {
  const role = "Estudiante";
  if (role === "Admin") {
    const { courseId } = req.params;

    const course = await courseService.getCourseDetail(courseId);

    if (!course) return res.status(404).json({ message: "Course no found" });

    return res.status(200).json(new CourseSerializer(course));
  }

  if (role === "Estudiante") {
    const { courseId } = req.params;

    const course = await courseService.getCourseDetailAll(courseId);

    if (!course) return res.status(404).json({ message: "Course no found" });

    return res.status(200).json(new CourseSerializer(course));
  }
};

const updateCourse = async (req, res, next) => {
  const { courseId } = req.params;

  const course = await courseService.getCourseById(courseId);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  const dataBody = req.body;

  const result = validateLesson(dataBody);

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const dataLesson = await courseService.addLessonToCourse(course, dataBody);

  return res.status(201).json(new LessonSerializer(dataLesson));
};

const deleteCourse = async (req, res, next) => {
  const { courseId } = req.params;

  const course = await courseService.getCourseById(courseId);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  const progressCourse = await course.getProgressCourse();

  if (progressCourse) {
    return res.status(405).json({ error: "Course cannot be deleted" });
  }

  await courseService.deleteCourse(course);

  return res.status(204).json({ message: "Course deleted successfully" });
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetail,
  getAllCourse,
};
