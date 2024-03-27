const Product = require("../../models/product.model");
const filterHelper = require("../../helpers/filter.helper");

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
  const objectPagination = {
    currentPage: 1,
    limitItems: 4
  }

  if(req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  const countRecords = await Product.countDocuments(find);
  objectPagination.totalPage = Math.ceil(countRecords/objectPagination.limitItems);
  // End Pagination

  const products = await Product
    .find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: req.query.keyword,
    objectPagination: objectPagination
  });
}