// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
  });
};