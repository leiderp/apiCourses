const express = require('express');

const v1CoursesRoutes = require('./src/v1/routes/courseRoutes');
const cors = require('./src/middlewares/cors');

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/courses", v1CoursesRoutes);

module.exports = app;