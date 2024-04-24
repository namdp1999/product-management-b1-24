const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [GET] /cart/
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({
    _id: req.cookies.cartId
  });

  cart.totalPrice = 0;

  for (const item of cart.products) {
    const infoProduct = await Product.findOne({
      _id: item.product_id
    }).select("thumbnail title price discountPercentage stock slug");

    infoProduct.priceNew = (infoProduct.price * (100 - infoProduct.discountPercentage)/100).toFixed(0);

    infoProduct.totalPrice = infoProduct.priceNew * item.quantity;

    cart.totalPrice += infoProduct.totalPrice;

    item.infoProduct = infoProduct;
  }

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  });
};

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  try {
    const cart = await Cart.findOne({
      _id: cartId
    });

    const existProductInCart = cart.products.find(item => item.product_id == productId);

    if(existProductInCart) {
      const quantityUpdate = existProductInCart.quantity + quantity;
      
      await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
      }, {
        $set: { "products.$.quantity": quantityUpdate }
      });
    } else {
      const objectCart = {
        product_id: productId,
        quantity: quantity,
      };
  
      await Cart.updateOne({
        _id: cartId
      }, {
        $push: { products: objectCart }
      });
    }
    req.flash("success", "Đã thêm sản phẩm vào giỏ hàng.");
  } catch (error) {
    req.flash("error", "Thêm sản phẩm vào giỏ hàng không thành công!");
  }

  res.redirect("back");
};