const Chat = require("../../models/chat.model");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary.helper");

module.exports = (req, res) => {
  const userId = res.locals.user.id;
  const userFullName = res.locals.user.fullName;
  const roomChatId = req.params.roomChatId;

  _io.once('connection', (socket) => {
    console.log("Có 1 user kết nối");

    // Add user vào phòng chat
    socket.join(roomChatId);

    // CLIENT_SEND_MESSAGE
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const images = [];

      if(data.images.length > 0) {
        for (const image of data.images) {
          const linkImage = await uploadToCloudinary(image);
          images.push(linkImage);
        }
      }

      console.log(images);

      // Lưu tin nhắn vào database
      const chat = new Chat({
        user_id: userId,
        room_chat_id: roomChatId,
        content: data.content,
        images: images,
      });

      await chat.save();

      // Trả data realtime về client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        user_id: userId,
        content: data.content,
        images: images,
        fullName: userFullName
      })
    })
    // End CLIENT_SEND_MESSAGE

    // CLIENT_SEND_TYPING
    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: userFullName,
        type: type
      });
    })
    // End CLIENT_SEND_TYPING
  })
}