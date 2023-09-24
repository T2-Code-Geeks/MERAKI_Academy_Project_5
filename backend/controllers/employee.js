const client  = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);

const registerEmployee = async (req, res) => {
    const { firstName, lastName, age, country, email, password, role_id } =
      req.body;
  
    const hasedPassword = await bcrypt.hash(password, saltRounds);
  
    const query = `INSERT INTO employees (firstName, lastName, age, country, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
    const data = [
      firstName,
      lastName,
      age,
      country,
      email.toLowerCase(),
      hasedPassword,
      role_id,
    ];
    client.query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Account created successfully",
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "The email already exists",
          err,
        });
      });
  };
  module.exports = {registerEmployee};