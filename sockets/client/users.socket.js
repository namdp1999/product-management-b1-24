const User = require("../../models/user.model");

module.exports = (req, res) => {
  const userIdA = res.locals.user.id;

  _io.once('connection', (socket) => {
    // Khi A gửi yêu cầu cho B
    socket.on("CLIENT_ADD_FRIREND", async (userIdB) => {
      console.log(userIdA);
      console.log(userIdB);

      // Thêm id của A vào acceptFriends của B
      const existAInB = await User.findOne({
        _id: userIdB,
        acceptFriends: userIdA
      });

      if(!existAInB) {
        await User.updateOne({
          _id: userIdB
        }, {
          $push: { acceptFriends: userIdA }
        });
      }

      // Thêm id của B vào requestFriends của A
      const existBInA = await User.findOne({
        _id: userIdA,
        requestFriends: userIdB
      });

      if(!existBInA) {
        await User.updateOne({
          _id: userIdA
        }, {
          $push: { requestFriends: userIdB }
        });
      }
    })

    // Khi A hủy gửi yêu cầu cho B
    socket.on("CLIENT_CANCEL_FRIREND", async (userIdB) => {
      console.log(userIdA);
      console.log(userIdB);

      // Xóa id của A trong acceptFriends của B
      await User.updateOne({
        _id: userIdB
      }, {
        $pull: { acceptFriends: userIdA }
      });

      // Xóa id của B trong requestFriends của A
      await User.updateOne({
        _id: userIdA
      }, {
        $pull: { requestFriends: userIdB }
      });
    })
  })
}