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

const { authMiddleware } = require('../../middlewares/authMiddleware');

router.get("/", authMiddleware, paginationMiddleware, getAllCourse);

router.get("/:courseId", authMiddleware, getCourseDetail);

router.post("/", authMiddleware, createCourse);

router.put("/:courseId", (req, res) => {
  res.send("Get all courses");
});

router.delete("/:courseId", authMiddleware, deleteCourse);

router.patch("/:courseId", authMiddleware, updateCourse);

module.exports = router;
