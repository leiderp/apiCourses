const userService = require("../services/userService");
const { validateUser } = require("../schemas/userSchema");
const { validateAuth } = require("../schemas/authSchema");
const UserSerializer = require("../serializers/UserSerializer");
const AuthSerializer = require("../serializers/AuthSerializer");
const jwt = require("../services/jwt");

const registerUser = async (req, res, next) => {
  try {
    const dataBody = req.body;

    const result = validateUser(dataBody);

    if (result.error) {
      return res
        .status(422)
        .json({ message: JSON.parse(result.error.message) });
    }

    const alreadyExists = await userService.getUserByEmail(result.data.email);

    if (alreadyExists) {
      return res
        .status(303)
        .json({ message: "Email has already been associated with an account" });
    }

    const dataUser = await userService.createUser(result.data);

    return res.status(201).json(new UserSerializer(dataUser));
  } catch (err) {
    next(err);
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const dataBody = req.body;

    const result = validateAuth(dataBody);
    if (result.error) {
      return res
        .status(422)
        .json({ message: JSON.parse(result.error.message) });
    }

    const user = await userService.getUserByEmail(result.data.email);

    if (!user) {
      return res.status(400).json({ message: "incorrect email or password" });
    }

    if (!(await user.comparePassword(result.data.password))) {
      return res.status(400).json({ message: "incorrect email or password" });
    }

    const accessToken = jwt.generateAccessToken(user.userId, user.role);

    res.json(new AuthSerializer(accessToken));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  authenticateUser,
};
