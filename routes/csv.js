const express = require("express");
const router = express.Router();

const { get_csv_all, get_download_csv } = require("../controllers/csv");

router.get("/view-all", get_csv_all);
router.get("/download", get_download_csv);
module.exports = router;
