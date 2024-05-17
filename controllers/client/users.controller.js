const User = require("../../models/user.model");

const usersSocket = require("../../sockets/client/users.socket");

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  // SocketIO
  usersSocket(req, res);
  // End SocketIO

  const userId = res.locals.user.id;
  const requestFriends = res.locals.user.requestFriends;
  const acceptFriends = res.locals.user.acceptFriends;
  const friendsList = res.locals.user.friendsList.map(user => user.user_id);

  const users = await User.find({
    $and: [
      {_id: {$ne: userId}},// not equal
      {_id: {$nin: requestFriends}}, // not in
      {_id: {$nin: acceptFriends}}, // not in
      {_id: {$nin: friendsList}} // not in
    ],
    status: "active",
    deleted: false,
  }).select("avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users
  });
};

// [GET] /users/request
module.exports.request = async (req, res) => {
  // SocketIO
  usersSocket(req, res);
  // End SocketIO

  const requestFriends = res.locals.user.requestFriends;

  const users = await User.find({
    _id: {$in: requestFriends},
    status: "active",
    deleted: false,
  }).select("avatar fullName");

  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gửi",
    users: users
  });
};

// [GET] /users/accept
module.exports.accept = async (req, res) => {
  // SocketIO
  usersSocket(req, res);
  // End SocketIO

  const acceptFriends = res.locals.user.acceptFriends;

  const users = await User.find({
    _id: {$in: acceptFriends},
    status: "active",
    deleted: false,
  }).select("avatar fullName");

  res.render("client/pages/users/accept", {
    pageTitle: "Lời mời đã nhận",
    users: users
  });
};

// [GET] /users/friends
module.exports.friends = async (req, res) => {
  const friendsList = res.locals.user.friendsList.map(user => user.user_id);

  const users = await User.find({
    _id: {$in: friendsList},
    status: "active",
    deleted: false,
  }).select("avatar fullName");

  console.log(users);

  res.render("client/pages/users/friends", {
    pageTitle: "Danh sách bạn bè",
    users: users
  });
};