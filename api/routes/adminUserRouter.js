const express = require("express");
const { adminUserController } = require("../controllers");

const router = express.Router();

router.post("/signup", adminUserController.adminUserSignUp);

module.exports = router;
