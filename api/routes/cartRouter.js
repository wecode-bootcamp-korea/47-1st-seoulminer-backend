const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", cartController.createCartItem);
router.get("/list", loginRequired, cartController.getCartList);
router.patch("", loginRequired, cartController.updateCartItem);
router.delete("/:cartId", cartController.cartProductDeleteByCartId);

module.exports = router;
