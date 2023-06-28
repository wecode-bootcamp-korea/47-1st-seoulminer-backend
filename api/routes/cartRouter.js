const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.get("/:userId", cartController.cartLookUpByUserId);

module.exports = router;
