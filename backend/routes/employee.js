const express = require("express");
const employeeRouter = express.Router();

const { registerEmployee } = require("../controllers/employee");

employeeRouter.post("/register", registerEmployee);


module.exports = employeeRouter;