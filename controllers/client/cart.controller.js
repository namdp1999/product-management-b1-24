const Cart = require("../../models/cart.model");

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