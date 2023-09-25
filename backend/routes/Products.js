const express = require("express");
const productsRouts = express.Router();
const authentication = require("../middleware/authentication");

const { createNewCategory, updateCategoryById, deleteCategoryById, createNewProduct, updateProductById, deleteProductById, getAllCategory, getCategoryById, getProductById, getAllProducts } = require("../controllers/products");
// ! Create New Category
productsRouts.post("/category", authentication, createNewCategory);
// ! Update Category
productsRouts.put("/category/:id", authentication, updateCategoryById);
// ! Delete Category
productsRouts.delete("/category/:id", authentication, deleteCategoryById);
// ! Get all category 
productsRouts.get("/category", getAllCategory);
// ! Get  category by id
productsRouts.get("/category/:id", getCategoryById);
// ! Create Product
productsRouts.post("/", authentication, createNewProduct);
// ! Update Product
productsRouts.put("/:id", authentication, updateProductById);
// ! Delete Products
productsRouts.delete("/:id", authentication, deleteProductById);
// ! Get all Products
productsRouts.get("/", getAllProducts);
// ! Get  Product by id
productsRouts.get("/:id", getProductById);
module.exports = productsRouts;