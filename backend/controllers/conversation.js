const conversationModal = require("../models/Conversation");

// ! new conversation

const CreateNewConversation = async(req, res) => {
  const newConversation = new conversationModal({
    members: [
        req.token.user_id||req.token.employee_id, 
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

// ! Get Conversation By user id

const getConversationById=async (req,res)=>{
try {
    
const conversation=await conversationModal.find({members:{$in:[req.token.user_id||req.token.employee_id]}})
res.status(200).json({
    success:true,
    message:"get  Conversations",
    result:conversation
})

} catch (error) {
    res.status(500).json({
        success:false,
        message:"Server Error",
        err:error.message
       }) 
}
};



module.exports = { CreateNewConversation ,getConversationById};
