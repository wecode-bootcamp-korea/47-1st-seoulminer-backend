const express = require('express');
const { cartController } = require("../controllers")

const router = express.Router();

router.post('', cartController.createCartItem);
router.delete('/all', cartController.deleteCart)

module.exports = router;