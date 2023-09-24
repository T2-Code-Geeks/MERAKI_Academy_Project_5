const express = require("express");
const userRouter = express.Router();

const { userRegister } = require("../controllers/users");

userRouter.post("/", userRegister);

module.exports = userRouter;