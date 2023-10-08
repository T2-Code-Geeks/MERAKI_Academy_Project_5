const messageModal = require("../models/Message");

const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    console.log(data);
    data.success = true;
    socket.to("room-" + data.to).emit("message", data);
    socket.emit("message", data);
  });
};

// ! new message

const CreateNewMessage = async (req, res) => {
  const userSender = req.token.user_id;
  const employeeSender=req.token.employee_id;
  const { conversationId, text } = req.body;
  const newMessage = new messageModal({
    sender:userSender||employeeSender,
    conversationId,
    text,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json({
      success: true,
      message: "Created new message",
      result: savedMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }
};

// ! Get message By conversation Id

const getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await messageModal.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({
      success: true,
      message: "All Messages",
      result: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }
};

module.exports = { CreateNewMessage, getMessagesByConversationId, messageHandler };
