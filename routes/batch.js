const express = require("express");
const router = express.Router();

const { get_batch, post_batch } = require("../controllers/batch");

router.get("/create", get_batch);
router.post("/create", post_batch);

module.exports = router;
