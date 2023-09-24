const express = require("express");
const productsRouts = express.Router();

const { createNewCategory, updateCategoryById,  } = require("../controllers/products");
// ! Create New Category
productsRouts.post("/category", createNewCategory);
// ! Update Category
productsRouts.put("/category/:id", updateCategoryById);


module.exports = productsRouts;