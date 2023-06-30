const express = require("express");

const { productController } = require("../controllers");
const router = express.Router();

router.get("/all", productController.getAllProducts);

module.exports = router;
