const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.delete("/:cartId", cartController.cartProductDeleteByCartId);

module.exports = router;
