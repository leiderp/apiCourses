const express = require("express");

const v1CoursesRoutes = require("./src/v1/routes/courseRoutes");
const v1AuthRoutes = require("./src/v1/routes/userRoutes");
const cors = require("./src/middlewares/cors");
const ErrorSerializer = require("./src/serializers/ErrorSerializer");

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/courses", v1CoursesRoutes);
app.use("/api/v1/auth", v1AuthRoutes);

app.use((req, res, next) => {
  res.status(404);
  res.json(new ErrorSerializer(404, "Resource not found", null));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode);
  res.json(new ErrorSerializer(message, null));
});

module.exports = app;
