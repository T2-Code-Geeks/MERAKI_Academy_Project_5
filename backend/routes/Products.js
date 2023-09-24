const express = require("express");
const productsRouts = express.Router();

const { createNewCategory,  } = require("../controllers/products");
// ! Create New Category
productsRouts.post("/category", createNewCategory);


module.exports = productsRouts;