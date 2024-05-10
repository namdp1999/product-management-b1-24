const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

// [GET] /chat/
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const userFullName = res.locals.user.fullName;

  // SocketIO
  _io.once('connection', (socket) => {
    console.log("Có 1 user kết nối");

    // CLIENT_SEND_MESSAGE
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      console.log(userId);
      console.log(content);
      
      // Lưu tin nhắn vào database
      const chat = new Chat({
        user_id: userId,
        // room_chat_id: String,
        content: content,
        // images: Array,
      });

      await chat.save();

      // Trả data realtime về client
      _io.emit("SERVER_RETURN_MESSAGE", {
        user_id: userId,
        content: content,
        fullName: userFullName
      })
    })
    // End CLIENT_SEND_MESSAGE
  })
  // End SocketIO

  // Lấy data trong database
  const chats = await Chat.find({
    deleted: false
  });

  for(chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id
    });

    chat.userFullName = infoUser.fullName
  }
  // Hết Lấy data trong database

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats
  });
};