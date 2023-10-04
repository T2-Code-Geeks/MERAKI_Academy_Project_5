const express = require("express");
const productsRouts = express.Router();
const authentication = require("../middleware/authentication");

const { createNewCategory, updateCategoryById, deleteCategoryById, createNewProduct, updateProductById, deleteProductById, getAllCategory, getCategoryById, getProductById, getAllProducts, getProductsByCategory, getAllOrdersDetails, updateStatus, newOrder, getAllOrderDetailsById } = require("../controllers/products");
// ! Create New Category
productsRouts.post("/category",  createNewCategory);
// ! Update Category
productsRouts.put("/category/:id",updateCategoryById);
// ! Delete Category
productsRouts.delete("/category/:id",  deleteCategoryById);
// ! Get all category 
productsRouts.get("/category", getAllCategory);
// ! Get  category by id
productsRouts.get("/category/:id", getCategoryById);
// ! Create Product
productsRouts.post("/", createNewProduct);
// ! Update Product
productsRouts.put("/:id",  updateProductById);
// ! Delete Products
productsRouts.delete("/:id", deleteProductById);
// ! Get all Products
productsRouts.get("/", getAllProducts);
// ! Get  Product by id
productsRouts.get("/:id", getProductById);
// ! Get  Product by category
productsRouts.get("/category/products/:id", getProductsByCategory);
productsRouts.get("/All/Orders", getAllOrdersDetails);
productsRouts.put("/status/:productId", updateStatus);
productsRouts.post("/order", newOrder);
productsRouts.get("/order/all", authentication, getAllOrderDetailsById);

module.exports = productsRouts;