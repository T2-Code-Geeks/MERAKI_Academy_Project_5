const express = require("express");
const userRouter = express.Router();

const authentication = require("../middleware/authentication");

const { userRegister, userLogin, UpdateUserById, deleteUserById, getAllUsers, getUserById, addToBasket, getUserBasket, getAllOrdersDetails } = require("../controllers/users");

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/:id", UpdateUserById);
userRouter.delete("/:id", authentication, deleteUserById);
userRouter.get("/", authentication, getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/basket", authentication, addToBasket);
userRouter.get("/basket/get", authentication, getUserBasket);
userRouter.get("/All/Orders", getAllOrdersDetails);

module.exports = userRouter;