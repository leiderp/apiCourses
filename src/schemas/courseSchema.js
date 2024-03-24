const zod = require("zod");

const courseSchema = zod.object({
  logo: zod.string().url({
    message: "logo must be a valid URL",
  }),
  title: zod.string({
    invalid_type_error: "title must be a string",
    required_error: "title is required",
  }),
  description: zod.string().optional(),
  publicationDate: zod.coerce.date().optional(),
  introVideo: zod.string().url({
    message: "introVideo must be a valid URL",
  }),
  lessons: zod
    .object({
      title: zod.string({
        invalid_type_error: "title must be a string",
        required_error: "title is required",
      }),
      description: zod.string().optional(),
      linkVideo: zod.string().url({
        message: "linkVideo must be a valid URL",
      }),
      courseId: zod.string().uuid({ message: "Invalid UUID" }).optional(),
      createdAt: zod.date().optional(),
      updatedAt: zod.date().optional(),
    })
    .array()
    .optional(),
  createdAt: zod.date().optional(),
  updatedAt: zod.date().optional(),
});

const validateCourse = (object) => {
  return courseSchema.safeParse(object);
};

module.exports = {
  validateCourse,
};
