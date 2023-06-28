const express = require('express');
const { cartController } = require("../controllers")

const router = express.Router();

router.post('/add', cartController.addProductToCart);
router.patch('/update', cartController.updateProductQuantity);

module.exports = router;