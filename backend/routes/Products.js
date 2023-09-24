const express = require("express");
const productsRouts = express.Router();

const { createNewCategory, updateCategoryById, deleteCategoryById, createNewProduct, updateProductById } = require("../controllers/products");
// ! Create New Category
productsRouts.post("/category", createNewCategory);
// ! Update Category
productsRouts.put("/category/:id", updateCategoryById);
// ! Delete Category
productsRouts.delete("/category/:id",deleteCategoryById);
// ! Create Product
productsRouts.post("/", createNewProduct);
// ! Update Category
productsRouts.put("/:id", updateProductById);

module.exports = productsRouts;