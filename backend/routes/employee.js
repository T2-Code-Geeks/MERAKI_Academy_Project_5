const express = require("express");
const employeeRouter = express.Router();

const { registerEmployee,loginRegister } = require("../controllers/employee");

employeeRouter.post("/register", registerEmployee);
employeeRouter.post("/login", loginRegister);

module.exports = employeeRouter;