const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree.helper");

// [GET] /admin/products-category/
module.exports.index = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false
  });

  console.log(records);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: records
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false
  });

  const newRecords = createTreeHelper(records);

  res.render("admin/pages/products-category/create", {
    pageTitle: "Thêm mới danh mục sản phẩm",
    records: newRecords
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};






// [
//   {
//     id: "123",
//     title: "Điện thoại",
//     childen: [
//       {
//         id: "123",
//         title: "Điện thoại Iphone"
//       },
//       {
//         id: "123",
//         title: "Điện thoại Samsung"
//       }
//     ]
//   },
//   {
//     id: "123",
//     title: "Thời trang",
//     childen: [
//       {
//         id: "123",
//         title: "Thời trang nam",
//         childen: [
//           {
//             id: "123",
//             title: "Áo sơ mi nam"
//           },
//           {
//             id: "123",
//             title: "Quần âu nam"
//           },
//           {
//             id: "123",
//             title: "Giày nam"
//           },
//         ]
//       },
//       {
//         id: "123",
//         title: "Thời trang nữ"
//       },
//       {
//         id: "123",
//         title: "Thời trang trẻ em"
//       }
//     ]
//   },
// ]