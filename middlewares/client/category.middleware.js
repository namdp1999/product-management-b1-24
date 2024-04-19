const ProductCategory = require("../../models/product-category.model");

const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.category = async (req, res, next) => {
  const productCategory = await ProductCategory.find({
    deleted: false,
    status: "active"
  });

  const newProductCategory = createTreeHelper(productCategory);

  res.locals.layoutProductCategory = newProductCategory;

  next();
}