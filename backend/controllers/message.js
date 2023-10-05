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
  const sender = req.token.user_id;
  const { conversationId, text } = req.body;
  const newMessage = new messageModal({
    sender,
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

// ! Get message By user id



module.exports = { CreateNewMessage, getConversationById, messageHandler };
