const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.get("/list", cartController.getCartList);

module.exports = router;
