const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const db = require("./models/db");

// ! Router Name -------------------
const roleRouter = require("./routes/role");
const productsRouts = require("./routes/products");
const employeeRouter = require("./routes/employee");
const userRouter = require("./routes/Users");
const socketAuth = require("./middleware/socketAuth");
const messageHandler = require("./controllers/message");

// Router Endpoint ----------------------------
app.use("/role", roleRouter);
app.use("/employees",employeeRouter);
app.use("/products", productsRouts);
app.use("/users", userRouter);


// ! Handles any other endpoints 

app.use("*", (req, res) => res.status(404).json("NO content at this path"));


// ! Socket.io
const clients={}
const server = http.createServer(app);
const io = socket(server, { cors: { origin: "*" } });

io.use(socketAuth)

io.on("connection", (socket) => {
console.log(socket.user);
  const userID=socket.handshake.headers.user_id;
  clients[userID]={socket_id:socket.id,userID};
console.log(clients);



messageHandler(socket,io)


socket.on("disconnect",()=>{

  for (const key in clients) {
    if (clients[key].socket_id===socket.id) {
  
      delete clients[key]
    }
  }
  console.log(clients);
})




  });

server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log("===========================================");
});