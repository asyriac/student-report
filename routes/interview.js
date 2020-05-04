const express = require("express");
const router = express.Router();

const { get_create_interview, post_create_interview, get_all_interviews, get_apply, post_apply, get_interview, post_update_status } = require("../controllers/interview");

router.get("/create", get_create_interview);
router.post("/create", post_create_interview);
router.get("/view-all", get_all_interviews);
router.get("/apply", get_apply);
router.post("/apply", post_apply);
router.get("/:id", get_interview);
router.post("/update/:id/:student", post_update_status);
module.exports = router;
