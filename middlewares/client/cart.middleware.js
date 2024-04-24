const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res, next) => {
  if(!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    res.cookie("cartId", cart.id);
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId
    });
    
    res.locals.miniCart = cart;
  }
  next();
}