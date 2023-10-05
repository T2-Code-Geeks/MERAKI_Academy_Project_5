const express = require("express");
const authentication = require("../middleware/authentication");
const { CreateNewMessage } = require("../controllers/message");
const messageRouter = express.Router();

messageRouter.post("/",authentication,CreateNewMessage)

// messageRouter.get("/",authentication,getConversationById)

module.exports = messageRouter;