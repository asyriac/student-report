const express = require("express");
const router = express.Router();

const { get_signup, post_signup, get_login, post_login, get_home, signout } = require("../controllers/employee");
const { checkAuth } = require("../middleware/auth");

router.use("/home", checkAuth, get_home);
router.get("/sign-up", get_signup);
router.post("/sign-up", post_signup);
router.get("/login", get_login);
router.post("/login", post_login);
router.get("/sign-out", signout);
module.exports = router;
