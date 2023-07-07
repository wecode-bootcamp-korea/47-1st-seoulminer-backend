const express = require("express");
const { orderController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.get("/:orderNumber", loginRequired, orderController.getOrderItems);
router.get("", loginRequired, orderController.getAllOrders);
router.post("/item", loginRequired, orderController.createUserOrderByItem);
router.post("/cart", loginRequired, orderController.createUserOrderByCart);

module.exports = router;
