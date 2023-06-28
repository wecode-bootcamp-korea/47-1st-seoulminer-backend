const express = require('express');
const { cartController } = require("../controllers")

const router = express.Router();

router.post('/add', cartController.addProductToCart);

module.exports = router;