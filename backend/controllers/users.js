const client = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
    try {
        const { firstName, lastName, img, age, country, address1, address2, email, password } = req.body;
        if (firstName && lastName && email && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await client.query(`INSERT INTO users (firstName, lastName, img, age, country, address1, address2, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`, [firstName, lastName, img, age, country, address1, address2, email.toLowerCase(), hashedPassword, 2]);
            res.json({
                success: true,
                message: "Account Created",
                result:result.rows[0]
            })
            
        }
    } catch (error) {
        if (error.code === "23505") {
            res.json({
                success: false,
                message: "Email already exists",
                error: error.message
            })
        } else {
            res.json({
                success: false,
                message: "Server Error",
                error:error.message
            })
        }
    }
}

module.exports = {
    userRegister,
}