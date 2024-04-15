const md5 = require("md5");

const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false,
  };
  // End Find

  const records = await Account.find(find);

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    });

    record.roleTitle = role.title;
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Thêm mới tài khoản",
    roles: roles
  });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  req.body.token = generateHelper.generateRandomString(30);

  const account = new Account(req.body);
  await account.save();

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
};

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      _id: req.params.id,
      deleted: false,
    };

    const data = await Account.findOne(find);

    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
  
    await Account.updateOne({
      _id: req.params.id,
      deleted: false
    }, req.body);

    res.redirect("back");
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
};