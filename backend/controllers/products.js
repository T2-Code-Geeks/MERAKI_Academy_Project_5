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
            result: result.rows[0],
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
                res.status(404).json({
                    success: false,
                    message: `No category with id: ${id} found`,
                });
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
// ! Get all category
const getAllCategory = (req, res) => {
    const query = `SELECT * FROM product_category  WHERE is_deleted=0;`;

    client
        .query(query)
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "All the category",
                result: result.rows,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err,
            });
        });
};
// ! Get  category by id
const getCategoryById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM product_category  WHERE id=$1;`;
    const data = [id];

    client
        .query(query, data)
        .then((result) => {
            if (result.rows.length !== 0) {
                res.status(200).json({
                    success: true,
                    message: `The article with id: ${id}`,
                    result: result.rows,
                });
            } else {
                throw new Error("Error happened while getting article");
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
        const { name, description, img, price, category_id, inventory_ID } = req.body;
        const query =
            "INSERT INTO products (name, description, img, price, category_id, inventory_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
        const data = [name, description, img, price, category_id, inventory_ID];
        const result = await client.query(query, data);
        res.status(201).json({
            success: true,
            message: "Product Created",
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


// ! Update Product
const updateProductById = (req, res) => {
    const id = req.params.id;
    let { name, description, img, price, category_id, inventory_ID } = req.body;

    const query = `UPDATE products SET name = COALESCE($1,name),   description = COALESCE($2, description),
    img = COALESCE($3, img),
    price = COALESCE($4, price),
    category_id = COALESCE($5, category_id),
    inventory_ID = COALESCE($6, inventory_ID)
     WHERE id=$7 AND is_deleted = 0  RETURNING *;`;
    const data = [
        name || null,
        description || null,
        img || null,
        price || null,
        category_id || null,
        inventory_ID || null,
        id,
    ];
    client
        .query(query, data)
        .then((result) => {
            if (result.rows.length > 0) {
                res.status(200).json({
                    success: true,
                    message: `products with id: ${id} updated successfully `,
                    result: result.rows[0],
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `No product with id: ${id} found`,
                });
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
// ! Delete Products
const deleteProductById = (req, res) => {
    const id = req.params.id;
    const query = `UPDATE products SET is_deleted=1 
      WHERE id=$1;`;
    client
        .query(query, [id])
        .then((result) => {
            if (result.rowCount !== 0) {
                res.status(200).json({
                    success: true,
                    message: `product with id: ${id} deleted successfully`,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `No product with id: ${id} found`,
                });
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
// ! Get all Products
const getAllProducts = (req, res) => {
    const query = `SELECT * FROM products  WHERE is_deleted=0;`;

    client
        .query(query)
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "All the category",
                result: result.rows,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err,
            });
        });
};
// ! Get  Products by id
const getProductById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM products  WHERE id=$1;`;
    const data = [id];

    client
        .query(query, data)
        .then((result) => {
            if (result.rows.length !== 0) {
                res.status(200).json({
                    success: true,
                    message: `The product with id: ${id}`,
                    result: result.rows[0],
                });
            } else {
                throw new Error("Error happened while getting article");
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
// ! Get  Products by Category
const getProductsByCategory = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM products  WHERE category_id=$1;`;
    const data = [id];

    client
        .query(query, data)
        .then((result) => {
            if (result.rows.length !== 0) {
                res.status(200).json({
                    success: true,
                    message: `The products with category: ${id}`,
                    result: result.rows,
                });
            } else {
                throw new Error("Error happened while getting article");
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

const newOrder = (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.json({
            success: true,
            result: error.message
        });
    }
}

const getAllOrdersDetails = async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM order_details`);
        res.json({
            success: true,
            result: result.rows
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            error: error.message
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await client.query(`UPDATE order_details SET shipping_status='On Proceed' WHERE id=$1 RETURNING *`, [productId]);
        res.json({
            success: true,
            result: result.rows[0]
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success: true,
            error: error.result
        })
    }
}
module.exports = {
    createNewCategory,
    updateCategoryById,
    deleteCategoryById,
    createNewProduct,
    updateProductById,
    deleteProductById,
    getAllCategory,
    getCategoryById,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getAllOrdersDetails,
    updateStatus,
    newOrder
};
