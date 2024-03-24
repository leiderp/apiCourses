const zod = require("zod");

const authSchema = zod.object({
  email: zod.string(
    {
        required_error: "email is required",
    }
  ).email({
    message: "Invalid format email address",
  }),
  password: zod.string({
    required_error: "password is required",
  }),
});

const validateAuth = (object) => {
  return authSchema.safeParse(object);
};

module.exports = {
    validateAuth,
};
