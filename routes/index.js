const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middleware/auth");

router.use("/employee", require("./employee"));
router.use("/batch", require("./batch"));
router.use("/student", require("./student"));
router.use("/interview", checkAuth, require("./interview"));
router.use("/csv", checkAuth, require("./csv"));
module.exports = router;
