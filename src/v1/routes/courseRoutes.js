const express = require("express");
const router = express.Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetail,
  getAllCourse,
} = require("../../controllers/courseController");

const { paginationMiddleware } = require('../../middlewares/paginationMiddleware');

router.get("/", paginationMiddleware, getAllCourse);

router.get("/:courseId", getCourseDetail);

router.post("/", createCourse);

router.put("/:courseId", (req, res) => {
  res.send("Get all courses");
});

router.delete("/:courseId", deleteCourse);

router.patch("/:courseId", updateCourse);

module.exports = router;
