const client = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);

// this function create account as employee ... 

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
  client
    .query(query, data)
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

// this function do login as employee .. 

const loginRegister = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  const query=(`SELECT * FROM employees WHERE email=$1`);
  const data=[email]
  client
    .query(query,data)
    .then(async (results) => {
      if (!results.rows.length) {
        return res.status(403).json({
          success: false,
          massege:
            "The email doesn't exist or The password you’ve entered is incorrect",
        });
      }
      try {
        const valid = await bcrypt.compare(password, results.rows[0].password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            massege:
              "The email doesn't exist or The password you’ve entered is incorrect",
          });
        }
        const payload = {
          employee_id: results.rows[0].id,
          role: results.rows[0].role_id,
        };
        console.log(payload);
        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SEACRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
        //console.log(token.payload);
      } catch (error) {
        throw new Error(error.message);
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

module.exports = { registerEmployee, loginRegister };
