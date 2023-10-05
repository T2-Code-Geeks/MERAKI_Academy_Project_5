const conversationModal = require("../models/Conversation");

// ! new conversation

const CreateNewConversation = async(req, res) => {
    console.log(req.token);
  const newConversation = new conversationModal({
    members: [
        req.token.user_id, 
        req.body.receiverId
    ],
  });

  try {
    const savedConversation= await newConversation.save();
    res.status(200).json({
        success:true,
        message:"Created new Conversation",
        result:savedConversation
    }

    )
  } catch (error) {
   res.status(500).json({
    success:false,
    message:"Server Error",
    err:error.message
   })
  }
};

module.exports = { CreateNewConversation };
