const client = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);

//! this function create account as employee ... 

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

// ! this function do login as employee .. 

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

// ! update Account profile employee ... 

const updateEmployeeById = (req, res) => {
    const id = req.params.id;
    const  { fristName, lastName ,description ,work_hour,country, category,img,age} = req.body;
    console.log(req.body,id)
    const query = `UPDATE employees SET firstName = COALESCE($1,firstName), lastName = COALESCE($2, lastName) , description = COALESCE($3, description) ,work_hour = COALESCE($4, work_hour), country = COALESCE($5, country) , category = COALESCE($6, category), img = COALESCE($7, img) , age = COALESCE($8, age) WHERE id=$9 AND is_deleted = 0  RETURNING *;`;
    const data = [fristName || null, lastName || null, description || null, work_hour || null , country || null, category || null , img || null, age || null, id];
    client
      .query(query, data)
      .then((result) => {
        if (result.rows.length !== 0) {
          res.status(200).json({
            success: true,
            message: `employee account with id: ${id} updated successfully `,
            result: result.rows[0],
          });
        } 
          else {
            throw new Error("Error happened while updating account employee");
  
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

module.exports = { registerEmployee, loginRegister,updateEmployeeById };
