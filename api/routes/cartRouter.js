const express = require('express');
const { cartController } = require("../controllers")

const router = express.Router();

router.post('', cartController.createCartItem);
router.patch('', cartController.updateCartItem);

module.exports = router;