const express = require('express');
const { cartController } = require("../controllers")
const { loginRequired } = require("../utils/auth")

const router = express.Router();

router.post('', loginRequired, cartController.createCartItem);
router.delete('/all', loginRequired, cartController.deleteCart)

module.exports = router;