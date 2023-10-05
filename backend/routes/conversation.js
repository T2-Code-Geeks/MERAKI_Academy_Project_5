const express = require("express");
const authentication = require("../middleware/authentication");
const { CreateNewConversation } = require("../controllers/conversation");
const conversationRouter = express.Router();


conversationRouter.post("/",authentication,CreateNewConversation)


module.exports = conversationRouter;