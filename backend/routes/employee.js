const express = require("express");
const employeeRouter = express.Router();

const { registerEmployee,loginEmployee,updateEmployeeById,deleteEmployeeById ,getAllEmployees,getEmployeeById,CreateEmployeeCategory ,getAllCategoryes} = require("../controllers/employee");

employeeRouter.get("/categoryes", getAllCategoryes);
employeeRouter.post("/register", registerEmployee);
employeeRouter.post("/login", loginEmployee);
employeeRouter.put("/:id", updateEmployeeById);
employeeRouter.delete("/:id", deleteEmployeeById);
employeeRouter.get("/", getAllEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", CreateEmployeeCategory);
module.exports = employeeRouter;