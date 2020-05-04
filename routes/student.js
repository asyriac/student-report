const express = require("express");
const router = express.Router();
const { get_create_student, post_create_student, get_all_students, get_update_student, post_update_student } = require("../controllers/student");

router.get("/create", get_create_student);
router.post("/create", post_create_student);
router.get("/view-all", get_all_students);
router.get("/update/:id", get_update_student);
router.post("/update/:id", post_update_student);
module.exports = router;
