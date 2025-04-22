const Message = require("../modules/message");

let userinfo = {}; // Store user socket IDs

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected`);

    // User joins a chat room
    socket.on("joinRoom", async ({ userId, recipientId }) => {
      console.log("recipientId,", recipientId, userId);
      const roomId = [userId, recipientId].sort().join("-"); // Ensure consistent room ID
      socket.join(roomId);
      console.log(roomId);
      userinfo[userId] = socket.id;

      try {
        // 🔹 Fetch last 20 messages for the room from MongoDB
        const messages = await Message.find({ roomId })
          .sort({ timestamp: -1 })
          .limit(20);

        // Send old messages to the user who joined
        socket.emit("previousMessages", messages.reverse());
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    });

    // Handle sending messages
    // socket.on("sendMessage", async ({ roomId, message, userId }) => {
    //   console.log(`Message from ${userId} to room ${roomId}:`, message);

    //   try {
    //     // 🔹 Save message to MongoDB
    //     const newMessage = new Message({ roomId, senderId: userId, message });
    //     await newMessage.save();

    //     // 🔹 Send the message to ALL users in the room (including the sender)
    //     io.to(roomId).emit("message", { message, senderId: userId });
    //   } catch (error) {
    //     console.error("Error saving message:", error);
    //   }
    // });

    // // Handle user disconnect
    // socket.on("disconnect", () => {
    //   const disconnectedUser = Object.keys(userinfo).find(
    //     (key) => userinfo[key] === socket.id
    //   );

    //   if (disconnectedUser) {
    //     delete userinfo[disconnectedUser];
    //     console.log(
    //       `User ${disconnectedUser} disconnected, socket ${socket.id}`
    //     );
    //   } else {
    //     console.log(`Socket ${socket.id} disconnected`);
    //   }
    // });
  });
};
