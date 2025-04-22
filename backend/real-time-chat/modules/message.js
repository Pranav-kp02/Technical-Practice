const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  roomId: String, // Room ID to store messages per conversation
  senderId: String, // Who sent the message
  message: String, // The message content
  timestamp: { type: Date, default: Date.now }, // Auto timestamp
});

module.exports = mongoose.model("Message", MessageSchema);
