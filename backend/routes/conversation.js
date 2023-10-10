const express = require("express");
const authentication = require("../middleware/authentication");
const { CreateNewConversation, getConversationById } = require("../controllers/conversation");
const conversationRouter = express.Router();


conversationRouter.post("/",authentication,CreateNewConversation)

conversationRouter.get("/",authentication,getConversationById)

module.exports = conversationRouter;