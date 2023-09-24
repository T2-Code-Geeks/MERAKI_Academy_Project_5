const express = require("express");
const userRouter = express.Router();

const { userRegister, userLogin, UpdateUserById, deleteUserById, getAllUsers, getUserById } = require("../controllers/users");

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/:id", UpdateUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);

module.exports = userRouter;