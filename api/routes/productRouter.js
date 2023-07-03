const express = require("express");

const { productController } = require("../controllers");
const router = express.Router();

router.get("/list", productController.getProductList);

module.exports = router;
