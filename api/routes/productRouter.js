const express = require("express");

const { productController } = require("../controllers");
const router = express.Router();

router.get("/list", productController.getProductList);
router.get("/:productId", productController.getProductByProductId);

module.exports = router;
