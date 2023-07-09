const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const adminUserRouter = require("./adminUserRouter");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/orders", orderRouter);
router.use("/adminUsers", adminUserRouter);

module.exports = router;
