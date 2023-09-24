const express = require("express");
const roleRouter = express.Router();

const { createNewRole } = require("../controllers/roles");

roleRouter.post("/", createNewRole);

module.exports = roleRouter;