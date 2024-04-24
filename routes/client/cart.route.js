const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/cart.controller");

router.get("/", controller.index);

router.post("/add/:productId", controller.addPost);

router.get("/delete/:productId", controller.deleteItem);

router.get("/update/:productId/:quantity", controller.updateItem);

module.exports = router;