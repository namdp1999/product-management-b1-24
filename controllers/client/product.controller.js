// [GET] /products/
module.exports.index = (req, res) => {
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm"
  });
}