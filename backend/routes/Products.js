const express = require("express");
const productsRouts = express.Router();

const { createNewCategory, updateCategoryById, deleteCategoryById, createNewProduct, updateProductById, deleteProductById, getAllCategory } = require("../controllers/products");
// ! Create New Category
productsRouts.post("/category", createNewCategory);
// ! Update Category
productsRouts.put("/category/:id", updateCategoryById);
// ! Delete Category
productsRouts.delete("/category/:id",deleteCategoryById);
// ! Get all category 
productsRouts.get("/category", getAllCategory);

// ! Create Product
productsRouts.post("/", createNewProduct);
// ! Update Product
productsRouts.put("/:id", updateProductById);
// ! Delete Products
productsRouts.delete("/:id",deleteProductById);
module.exports = productsRouts;