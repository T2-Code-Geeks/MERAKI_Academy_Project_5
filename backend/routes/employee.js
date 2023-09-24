const express = require("express");
const employeeRouter = express.Router();

const { registerEmployee,loginRegister,updateEmployeeById } = require("../controllers/employee");

employeeRouter.post("/register", registerEmployee);
employeeRouter.post("/login", loginRegister);
employeeRouter.put("/:id", updateEmployeeById);

module.exports = employeeRouter;