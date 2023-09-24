const express = require("express");
const userRouter = express.Router();

const { userRegister, userLogin, UpdateUserById } = require("../controllers/users");

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/:id", UpdateUserById);

module.exports = userRouter;