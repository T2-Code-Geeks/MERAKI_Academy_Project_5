const client = require("../models/db");

const createNewRole = async (req, res) => {
    try {
        const { role } = req.body;
        const result = await client.query("INSERT INTO roles (role) VALUES ($1) RETURNING *", [role]);
        res.status(201).json({
            success: true,
            message: "Role Created",
            role: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

module.exports = {
    createNewRole
}