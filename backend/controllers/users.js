const client = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ! Register User
const userRegister = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            img,
            age,
            country,
            address1,
            address2,
            email,
            password,
        } = req.body;
        if (firstName && lastName && email && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await client.query(
                `INSERT INTO users (firstName, lastName, img, age, country, address1, address2, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
                [
                    firstName,
                    lastName,
                    img,
                    age,
                    country,
                    address1,
                    address2,
                    email.toLowerCase(),
                    hashedPassword,
                    3,
                ]
            );
            res.json({
                success: true,
                message: "Account Created",
                result: result.rows[0],
            });
        } else {
            res.json({
                success: false,
                message: "Missing Info",
            });
        }
    } catch (error) {
        if (error.code === "23505") {
            res.json({
                success: false,
                message: "Email already exists",
                error: error.message,
            });
        } else {
            res.json({
                success: false,
                message: "Server Error",
                error: error.message,
            });
        }
    }
};
// ! Login User
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await client.query(
            `SELECT * FROM users WHERE email=$1 AND is_deleted=0`,
            [email.toLowerCase()]
        );
        if (result.rows.length) {
            const comparePassword = await bcrypt.compare(
                password,
                result.rows[0].password
            );
            if (comparePassword) {
                const payload = {
                    user_id: result.rows[0].id,
                    role_id: result.rows[0].role_id,
                };
                const options = {
                    expiresIn: "1d",
                };
                const token = jwt.sign(payload, process.env.SECRET, options);
                res.status(200).json({
                    success: true,
                    message: "Valid login credentials",
                    token,
                    user_id: result.rows[0].id,
                });
            } else {
                res.json({
                    success: false,
                    message: "Email or password error",
                });
            }
        } else {
            res.json({
                success: false,
                message: "Email or password error",
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

const loginGoogle = async (req, res) => {
    const user = req.body;
    const query = `SELECT * FROM users WHERE email=$1`;
    const data = [user.email];
    client
        .query(query, data)
        .then(async (results) => {
            if (!results.rows.length) {
                try {
                    const firstName = user.given_name;
                    const lastName = user.family_name;
                    const email = user.email;
                    const password = user.sub;
                    const img = user.picture;
                    if (firstName && lastName && email && password) {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const result = await client.query(
                            `INSERT INTO users (firstName, lastName, email, password,,img, role_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
                            [firstName, lastName, email.toLowerCase(), hashedPassword, 3]
                        );
                        console.log(result);
                        return res.json({
                            success: true,
                            message: "Account Created",
                            result: result.rows[0],
                        });
                    }
                } catch (error) {
                    if (error.code === "23505") {
                        res.json({
                            success: false,
                            message: "Email already exists",
                            error: error.message,
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "Server Error",
                            error: error.message,
                        });
                    }
                }
            }
            else {
                try {
                    const payload = {
                        employee_id: results.rows[0].id,
                        role_id: results.rows[0].role_id,
                        user_id: results.rows[0].user_id,
                    };
                    const options = {
                        expiresIn: "60m",
                    };
                    const token = jwt.sign(payload, process.env.SECRET, options);
                    return res.status(200).json({
                        success: true,
                        message: `Valid login credentials`,
                        token: token,
                        employee_id: results.rows[0].id,
                    });
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });

};

// ! Update User Info By Id

const UpdateUserById = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            img,
            age,
            country,
            address1,
            address2,
            password,
        } = req.body;
        const { id } = req.params;
        const data = [
            firstName || null,
            lastName || null,
            img || null,
            age || null,
            country || null,
            address1 || null,
            address2 || null,
            password || null,
        ];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            data[data.length - 1] = hashedPassword;
        }
        const result = await client.query(
            `UPDATE users SET firstName = COALESCE($1,firstName), lastName=COALESCE($2,lastName), img=COALESCE($3,img), age=COALESCE($4,age), country=COALESCE($5,country), address1=COALESCE($6,address1), address2=COALESCE($7,address2),password=COALESCE($8,password) WHERE id=$9 AND is_deleted=0 RETURNING *`,
            [...data, id]
        );
        res.json({
            success: true,
            result: result.rows[0],
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// ! Delete User By Id
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query(
            `UPDATE users SET is_deleted=1 WHERE id=$1`,
            [id]
        );
        res.json({
            success: true,
            message: "User deleted",
            result: result.rows[0],
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const result = await client.query(
            `SELECT id,firstName,lastName,img,age,country,address1,address2,email FROM users WHERE is_deleted=0`
        );
        res.json({
            success: true,
            result: result.rows,
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query(
            `SELECT id,firstName,lastName,img,age,country,address1,address2,email FROM users WHERE id=$1 AND is_deleted=0`,
            [id]
        );
        if (result.rows.length) {
            res.status(201).json({
                success: true,
                result: result.rows[0],
            });
        } else {
            res.json({
                success: true,
                message: "No users with this id",
            });
        }
    } catch (error) { }
};

const addToBasket = async (req, res) => {
    try {
        const { user_id } = req.token;

        const { product_id, quantity } = req.body;
        const result = await client.query(`SELECT *, order_items.id FROM order_items WHERE product_id=$1 AND user_id=$2 AND is_deleted=0`, [product_id, user_id]);
        if (result.rows.length) {


            await client.query(`UPDATE order_items SET quantity = $1 WHERE product_id = $2 AND user_id=$3 AND is_deleted=0 RETURNING *`, [quantity, product_id, user_id]);
            const result = await client.query(`SELECT *,order_items.id FROM order_items INNER JOIN products ON products.id = $1 AND order_items.product_id=$1 WHERE user_id = $2 AND order_items.is_deleted=0`, [product_id, user_id]);
            const remainingItems = await client.query(`SELECT *, order_items.id FROM order_items INNER JOIN products ON order_items.product_id = products.id WHERE user_id=$1 AND order_items.is_deleted=0`, [user_id]);
            res.status(200).json({
                success: true,
                result: result.rows,
                remaining: remainingItems.rows
            });
        } else {


            const update = await client.query(`INSERT INTO order_items (quantity, product_id, user_id) VALUES ($1,$2,$3) RETURNING *`, [quantity, product_id, user_id]);
            res.status(200).json({
                success: true,
                result: update.rows
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Server Error",
            error: error.message
        });

    }

  }

const getUserBasket = async (req, res) => {
    try {
        const { user_id } = req.token;
        const result = await client.query(`SELECT *, order_items.id FROM order_items INNER JOIN products ON order_items.product_id = products.id WHERE user_id=$1 AND order_items.is_deleted=0`, [user_id]);
        res.json({
            success: true,
            result: result.rows
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { user_id } = req.token;
        const result = await client.query(`DELETE FROM order_items WHERE user_id=$1 AND id=$2 RETURNING *`, [user_id, itemId]);
        const remainingItems = await client.query(`SELECT *, order_items.id FROM order_items INNER JOIN products ON order_items.product_id = products.id WHERE user_id=$1 AND order_items.is_deleted=0`, [user_id]);
        res.json({
            success: true,
            result: result.rows[0],
            remaining: remainingItems.rows
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: true,
            error: error.message
        })
    }
}

module.exports = {
    userRegister,
    userLogin,
    UpdateUserById,
    deleteUserById,
    getAllUsers,
    getUserById,
    addToBasket,
    getUserBasket,
    deleteCartItem,
    loginGoogle,
};
