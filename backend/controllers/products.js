const client = require("../models/db");
// ! Create New Category
const createNewCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await client.query(
      "INSERT INTO product_category (name, description) VALUES ($1,$2) RETURNING *",
      [name, description]
    );
    res.status(201).json({
      success: true,
      message: "category Created",
      role: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// ! Update Category
const updateCategoryById = (req, res) => {
  const id = req.params.id;
  let { name, description } = req.body;

  const query = `UPDATE product_category SET name = COALESCE($1,name), description = COALESCE($2, description) WHERE id=$3 AND is_deleted = 0  RETURNING *;`;
  const data = [name || null, description || null, id];
  client
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `category with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating article");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// ! Delete Category
const deleteCategoryById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE product_category SET is_deleted=1 
    WHERE id=$1;`;
  client
    .query(query, [id])
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `category with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting category");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
// ! Create Product
const createNewProduct = async (req, res) => {
  try {
    const { name, description, img, price, category_id, quantity } = req.body;
    const query =
      "INSERT INTO products (name, description, img, price, category_id, quantity) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
    const data = [name, description, img, price, category_id, quantity];
    const result = await client.query(query, data);
    res.status(201).json({
      success: true,
      message: "category Created",
      role: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,createNewProduct
};
