const RoomChat = require("../../models/rooms-chat.model");

module.exports.isAccecss = async (req, res, next) => {
  try {
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.user.id;

    const userInRoomChat = await RoomChat.findOne({
      _id: roomChatId,
      "users.user_id": userId,
      deleted: false
    });

    if(!userInRoomChat) {
      res.redirect("/");
      return;
    }
    
    next();
  } catch (error) {
    res.redirect("/");
  }
}