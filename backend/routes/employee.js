const express = require("express");
const employeeRouter = express.Router();
//!================================== import sections =============================================
const authentication = require("../middleware/authentication");
const {
  registerEmployee,
  loginEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  CreateEmployeeCategory,
  getAllCategoryes,
  getALLEmployeesBycategory,
  getFeadbackFromUser,
  deleteComment,
  getAllFeadbackFromUser,
  getAllHiring,
  updateHiring
} = require("../controllers/employee");
//!================================== import path section  =============================================

employeeRouter.post("/feadback/user",authentication ,getFeadbackFromUser);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.get("/allcomment/:id",getAllFeadbackFromUser)
employeeRouter.get("/categoryes/all", getAllCategoryes);
employeeRouter.get("/ByCategory/:category_id", getALLEmployeesBycategory);
employeeRouter.post("/register", registerEmployee);
employeeRouter.post("/login", loginEmployee);
employeeRouter.put("/:id", updateEmployeeById);
employeeRouter.delete("/:id", deleteEmployeeById);
employeeRouter.get("/hiring/all",authentication,getAllHiring);
employeeRouter.put("/updateHiring/:id",authentication,updateHiring)
employeeRouter.delete("/comment/:id",deleteComment)
employeeRouter.get("/",authentication, getAllEmployees);
employeeRouter.post("/", CreateEmployeeCategory);

//!==================================  exports router  =============================================

module.exports = employeeRouter;
