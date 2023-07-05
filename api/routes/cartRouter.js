const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", loginRequired, cartController.createCartItem);
router.get("/list", loginRequired, cartController.getCartList);
router.patch("", loginRequired, cartController.updateCartItem);
router.delete("/item/:cartId", loginRequired, cartController.cartProductDeleteByCartId);
router.delete("/all", loginRequired, cartController.deleteAllCart);

module.exports = router;
