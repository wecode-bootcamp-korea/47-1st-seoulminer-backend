const express = require("express");
const { orderController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.get("/:orderNumber", loginRequired, orderController.getOrderItems);
router.get("/item", loginRequired, orderController.createUserOrderByItem);

module.exports = router;
