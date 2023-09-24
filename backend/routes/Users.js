const express = require("express");
const userRouter = express.Router();

const { userRegister, userLogin, UpdateUserById, deleteUserById } = require("../controllers/users");

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/:id", UpdateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;