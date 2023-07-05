const express = require("express");
const { orderController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/item", loginRequired, orderController.createUserOrderByItem);

module.exports = router;
