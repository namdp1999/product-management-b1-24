const Product = require("../../models/product.model");
const filterHelper = require("../../helpers/filter.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const systemConfig = require("../../config/system");

// [GET] /admin/products/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  // Filter
  const filterStatus = filterHelper(req);

  if(req.query.status) {
    find.status = req.query.status;
  }
  // End Filter

  // Search
  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  // End Search

  // Pagination
  const countRecords = await Product.countDocuments(find);
  const objectPagination = paginationHelper(req, countRecords);
  // End Pagination

  const products = await Product
    .find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    .sort({ position: "desc" });

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: req.query.keyword,
    objectPagination: objectPagination
  });
}

// [PATCH] /admin/products/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({
    _id: id
  }, {
    status: status
  });

  const infoProduct = await Product.findOne({
    _id: id
  });

  req.flash('success', `Cập nhật trạng thái sản phẩm ${infoProduct.title} thành công!`);

  res.redirect(`back`);
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  let ids = req.body.ids;
  ids = ids.split(", ");

  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({
        _id: { $in: ids }
      }, {
        status: type
      });
      req.flash('success', 'Cập nhật trạng thái thành công!');
      break;
    case "delete-all":
      await Product.updateMany({
        _id: { $in: ids }
      }, {
        deleted: true
      });
      req.flash('success', 'Xóa sản phẩm thành công!');
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({
          _id: id
        }, {
          position: position
        });
      }
      req.flash('success', 'Thay đổi vị trí sản phẩm thành công!');
      break;
    default:
      break;
  }

  res.redirect(`back`);
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({
    _id: id
  }, {
    deleted: true
  });

  req.flash('success', 'Xóa sản phẩm thành công!');

  res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm"
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  }

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const record = new Product(req.body);
  await record.save();

  req.flash("success", "Thêm mới sản phẩm thành công!");
  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({
    _id: id,
    deleted: false
  });

  res.render("admin/pages/products/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product
  });
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  await Product.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  req.flash("success", "Cập nhật sản phẩm thành công!");
  res.redirect(`back`);
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({
    _id: id,
    deleted: false
  });

  res.render("admin/pages/products/detail", {
    pageTitle: `Sản phẩm: ${product.title}`,
    product: product
  });
}