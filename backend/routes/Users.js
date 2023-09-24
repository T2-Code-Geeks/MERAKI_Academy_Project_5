const express = require("express");
const userRouter = express.Router();

const { userRegister, userLogin } = require("../controllers/users");

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);

module.exports = userRouter;