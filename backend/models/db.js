const { Pool } = require("pg");

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     password: "0000",
//     port: "5432",
//     database: "project_5_database"
// });

// try {
//     client.connect();
//     console.log("Connected on: " + client.database);
// } catch (error) {
//     console.log("Client didn't connect", error.message, error.stack);
// }
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString,
});
pool
  .connect()
  .then((res) => {
    console.log(`DB connected to ${res.database}`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;



// ! Connect To MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI).then(
    () => {
        console.log("DB Ready To Use");
        console.log("============================================");
    },
    (err) => {
        console.log(err);
    }
);
