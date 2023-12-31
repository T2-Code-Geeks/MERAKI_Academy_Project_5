const express = require("express");
const userRouter = express.Router();

const authentication = require("../middleware/authentication");

const {
    userRegister,
    userLogin,
    UpdateUserById,
    deleteUserById,
    getAllUsers,
    getUserById,
    addToBasket,
    getUserBasket,
    loginGoogle,
    deleteCartItem,
    getUserOrders,
    hireEmployee,
} = require("../controllers/users");

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/:id", UpdateUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/basket", authentication, addToBasket);
userRouter.get("/basket/get", authentication, getUserBasket);
userRouter.delete("/basket/:itemId", authentication, deleteCartItem);
userRouter.post("/login/Google", loginGoogle);
userRouter.get("/orders/all", authentication, getUserOrders);
userRouter.post("/hire/:employeeId", authentication, hireEmployee);

module.exports = userRouter;
