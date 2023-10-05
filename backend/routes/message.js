const express = require("express");
const authentication = require("../middleware/authentication");
const { CreateNewMessage, getMessagesByConversationId } = require("../controllers/message");
const messageRouter = express.Router();

messageRouter.post("/",authentication,CreateNewMessage)

messageRouter.get("/:conversationId",authentication,getMessagesByConversationId)

module.exports = messageRouter;