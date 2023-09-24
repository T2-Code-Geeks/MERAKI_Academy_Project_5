const client = require("../models/db");

const createNewCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await client.query(
      "INSERT INTO product_category (name, description) VALUES ($1,$2) RETURNING *",
      [role]
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




module.exports={
    createNewCategory,
}