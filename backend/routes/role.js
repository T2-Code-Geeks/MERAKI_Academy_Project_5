const express = require("express");
const roleRouter = express.Router();

const { createNewRole, createNewPermission, createNewRolePermission } = require("../controllers/roles");

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);

module.exports = roleRouter;