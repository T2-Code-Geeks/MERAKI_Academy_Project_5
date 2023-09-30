const express = require("express");
const employeeRouter = express.Router();
const authentication = require("../middleware/authentication");

const { registerEmployee, loginEmployee, updateEmployeeById, deleteEmployeeById, getAllEmployees, getEmployeeById, CreateEmployeeCategory, getAllCategoryes,getALLEmployeesBycategory } = require("../controllers/employee");
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.get("/categoryes", getAllCategoryes);
employeeRouter.get("/ByCategory/:category_id",getALLEmployeesBycategory);
employeeRouter.post("/register", registerEmployee);
employeeRouter.post("/login", loginEmployee);
employeeRouter.put("/:id", updateEmployeeById);
employeeRouter.delete("/:id", deleteEmployeeById);
employeeRouter.get("/", getAllEmployees);

employeeRouter.post("/",  CreateEmployeeCategory);

module.exports = employeeRouter;