const md5 = require("md5");
const User = require("../../models/user.model");

const generateHelper = require("../../helpers/generate.helper");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existUser = await User.findOne({
    email: req.body.email,
    deleted: false
  });
  
  if(existUser) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return;
  }

  const userInfo = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    tokenUser: generateHelper.generateRandomString(30)
  };

  const user = new User(userInfo);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};