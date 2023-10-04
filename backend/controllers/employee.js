const client = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);

//! create category function ...
const CreateEmployeeCategory = async (req, res) => {
  const { category } = req.body;

  const query = `INSERT INTO employeeCategory (category) VALUES ($1) RETURNING *`;
  const data = [category];
  client
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "category created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The category already exists",
        err,
      });
    });
};

//! get all categorys ...
const getAllCategoryes = (req, res) => {
  const query = `SELECT * FROM employeeCategory WHERE is_deleted=0 ;`;
  client
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the Category",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: "hello",
      });
    });
};

//! this function create account as employee ...

const registerEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      country,
      email,
      password,
      role_id,
      category_id,
    } = req.body;
    if (firstName && lastName && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await client.query(
        `INSERT INTO employees (firstName, lastName, age, country, email,password, role_id,category_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          firstName,
          lastName,
          age,
          country,
          email.toLowerCase(),
          hashedPassword,
          1,
          category_id,
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

// ! this function do login as employee ..

const loginEmployee = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  const query = `SELECT * FROM employees WHERE email=$1`;
  const data = [email];
  client
    .query(query, data)
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
          role_id: results.rows[0].role_id,
          user_id: results.rows[0].user_id,
        };
        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          employee_id: results.rows[0].id,
        });
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
  const {
    firstName,
    lastName,
    description,
    work_hours,
    country,
    category_id,
    img,
    age,
  } = req.body;
  const query = `UPDATE employees SET firstName = COALESCE($1,firstName), lastName = COALESCE($2, lastName) , description = COALESCE($3, description) ,work_hours = COALESCE($4, work_hours), country = COALESCE($5, country) , category_id = COALESCE($6, category_id), img = COALESCE($7, img) , age = COALESCE($8, age) WHERE id=$9 AND is_deleted = 0  RETURNING *;`;
  const data = [
    firstName || null,
    lastName || null,
    description || null,
    work_hours || null,
    country || null,
    category_id || null,
    img || null,
    age || null,
    id,
  ];
  client
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `employee account with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
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
//! delete employee account by id ...
const deleteEmployeeById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE employees SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  client
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `employee with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting employee");
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

// ! get all employees function  ...
const getAllEmployees = (req, res) => {
  const query = `SELECT * FROM employees a WHERE a.is_deleted=0 ;`;
  client
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the employees",
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

//! get employee by id ...

const getEmployeeById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT firstName,lastName,description, work_hours ,country,category_id ,img,age FROM employees  WHERE id=$1 AND is_deleted=0;`;
  const data = [id];

  client
    .query(query, data)
    .then((result) => {
      console.log(result.rows);
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The employee with id: ${id}`,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while getting employee");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getALLEmployeesBycategory = (req, res) => {
  const category_id = req.params.category_id;
  const query = `SELECT * FROM employees  WHERE category_id=$1 AND employees.is_deleted=0;`;
  const data = [category_id];

  client
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `All employee with id: ${category_id}`,
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Employee At the section`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
      console.log(err);
    });
};

const getFeadbackFromUser = async (req, res) => {
  try {
    // const {user_id,employee_id}=req.params remember this well be take from token .....
    const { user_id } = req.token;
    const { comment, employee_id } = req.body;
    if (comment) {
      const result = await client.query(
        `INSERT INTO feadback_user (comment,user_id,employee_id) VALUES ($1,$2,$3) RETURNING *`,
        [comment, user_id, employee_id]
      );

      res.json({
        success: true,
        message: "Feadback has been Created",
        result: result.rows,
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
        message: "order already created",
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
const getAllFeadbackFromUser = async (req, res) => {
  const {id}=req.params
  try {
    const result = await client.query(`SELECT * FROM feadback_user a WHERE a.employee_id=($1);`,[id]);
    console.log(result)
    if (result) {
      res.json({
        success: true,
        message: "all feadback",
        result: result.rows,
      });
    } else {
      res.json({
        success: false,
        message: "no results",
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

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await client.query(
      `DELETE FROM feadback_user WHERE id =($1);`,
      [id]
    );
    if (results) {
      res.status(200).json({
        success: true,
        massege: "comment has been deleted",
      });
    } else {
      res.status(200).json({
        success: false,
        massege: "that is not your comment",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      massege: "server error",
      err: error.massege,
    });
  }
};
module.exports = {
  registerEmployee,
  loginEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  CreateEmployeeCategory,
  getAllCategoryes,
  getALLEmployeesBycategory,
  getFeadbackFromUser,
  deleteComment,
  getAllFeadbackFromUser,
};
