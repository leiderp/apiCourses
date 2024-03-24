const zod = require("zod");

const userSchema = zod.object({
  name: zod.string({
    required_error: "name is required",
  }),
  birthdate: zod.coerce.date(),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string({
    required_error: "password is required",
  }),
  role: zod.enum(["ADMIN", "ESTUDIANTE"]).optional(),
  createdAt: zod.date().optional(),
  updatedAt: zod.date().optional(),
});

const validateUser = (object) => {
  return userSchema.safeParse(object);
};

module.exports = {
    validateUser,
};
