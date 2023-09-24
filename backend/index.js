const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const db = require("./models/db");

// Router Name -------------------
const roleRouter = require("./routes/role");
const employeeRouter=require("./routes/employee");

// Router Endpoint ----------------------------
app.use("/role", roleRouter);
app.use("/employees",employeeRouter);


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log("===========================================");
});