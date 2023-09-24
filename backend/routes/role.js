const express = require("express");
const roleRouter = express.Router();

const { createNewRole, createNewPermission, createNewRolePermission } = require("../controllers/roles");

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role-permission", createNewRolePermission);

module.exports = roleRouter;