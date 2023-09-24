const express = require("express");
const employeeRouter = express.Router();

const { registerEmployee,loginEmployee,updateEmployeeById,deleteEmployeeById } = require("../controllers/employee");

employeeRouter.post("/register", registerEmployee);
employeeRouter.post("/login", loginEmployee);
employeeRouter.put("/:id", updateEmployeeById);
employeeRouter.delete("/:id", deleteEmployeeById);
module.exports = employeeRouter;