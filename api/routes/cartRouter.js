const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", cartController.createCartItem);
router.get("/list", loginRequired, cartController.getCartList);

module.exports = router;
