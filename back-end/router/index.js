const express = require('express');
const router = express.Router();
const TOKEN = require("./token");

const UserRouter = require("./userRouter");
const SuperAdminRouter = require("./superAdminRouter");

router.use("/users", UserRouter);
router.use("/superAdmin", SuperAdminRouter);

module.exports = router;