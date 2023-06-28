const express = require("express");

const { productController } = require("../controllers");
const router = express.Router();

router.get("/all", productController.lookupAllProducts);
router.get("/:productId", productController.lookupProductByProductId);

module.exports = router;
