const express = require("express");
const router = express.Router();

const {
    registerUser,
    authenticateUser
} = require("../../controllers/userController");


router.post("/login", authenticateUser);

router.post("/register", registerUser);

module.exports = router;