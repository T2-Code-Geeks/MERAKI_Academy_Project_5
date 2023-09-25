const express = require("express");
const userRouter = express.Router();

const authentication = require("../middleware/authentication");

const { userRegister, userLogin, UpdateUserById, deleteUserById, getAllUsers, getUserById } = require("../controllers/users");

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/:id", authentication, UpdateUserById);
userRouter.delete("/:id", authentication, deleteUserById);
userRouter.get("/", authentication, getAllUsers);
userRouter.get("/:id", authentication, getUserById);

module.exports = userRouter;