const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

const chatSocket = require("../../sockets/client/chat.socket");

// [GET] /chat/
module.exports.index = async (req, res) => {
  // SocketIO
  chatSocket(req, res);
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