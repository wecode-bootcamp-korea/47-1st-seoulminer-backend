const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.delete("/:cartId", cartController.cartProductDeleteByCartId);
router.post("", cartController.createCartItem);

module.exports = router;
