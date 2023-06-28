const express = require('express');
const { userController } = require("../controllers")

const router = express.Router();

router.get('/signin', userController.signIn);

module.exports = router;