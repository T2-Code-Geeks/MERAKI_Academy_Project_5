const express = require("express");
const employeeRouter = express.Router();
const authentication = require("../middleware/authentication");

const { registerEmployee, loginEmployee, updateEmployeeById, deleteEmployeeById, getAllEmployees, getEmployeeById, CreateEmployeeCategory, getAllCategoryes } = require("../controllers/employee");

employeeRouter.get("/categoryes", getAllCategoryes);
employeeRouter.post("/register", registerEmployee);
employeeRouter.post("/login", loginEmployee);
employeeRouter.put("/:id", authentication, updateEmployeeById);
employeeRouter.delete("/:id", authentication, deleteEmployeeById);
employeeRouter.get("/", authentication, getAllEmployees);
employeeRouter.get("/:id", authentication, getEmployeeById);
employeeRouter.post("/", authentication, CreateEmployeeCategory);
module.exports = employeeRouter;