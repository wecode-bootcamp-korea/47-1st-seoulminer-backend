const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.post("", cartController.createCartItem);
router.get("/:userId", cartController.getCartList);

module.exports = router;
