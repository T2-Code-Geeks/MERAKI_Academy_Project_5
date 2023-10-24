const pool = require("../models/db");

const createNewRole = async (req, res) => {
    try {
        const { role } = req.body;
        const result = await pool.query("INSERT INTO roles (role) VALUES ($1) RETURNING *", [role]);
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

const createNewPermission = (req, res) => {
    const { permission } = req.body;
    const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *;`;
    const data = [permission];

    pool
        .query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: `Permission created successfully`,
                result: result.rows[0],
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server error`,
                err: err.message,
            });
        });
};

const createNewRolePermission = (req, res) => {
    const { role_id, permission_id } = req.body;
    const query = `INSERT INTO role_permission (role_id,
    permission_id) VALUES ($1,$2) RETURNING *`;
    const data = [role_id, permission_id];

    pool
        .query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: ` Role Permission created successfully`,
                result: result.rows[0],
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server error`,
                err: err.message,
            });
        });
};

module.exports = {
    createNewRole,
    createNewPermission,
    createNewRolePermission
}