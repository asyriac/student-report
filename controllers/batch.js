const Batch = require("../models/Batch");

// @desc    Create a new batch
// @route   GET /batch/create
module.exports.get_batch = (req, res) => {
  return res.render("batch", {
    title: "Add batch",
    errorMessage: req.flash("error"),
  });
};

// @desc    Create a new batch
// @route   POST /batch/create
module.exports.post_batch = async (req, res) => {
  const batch = await Batch.findOne(req.body);
  if (!batch) {
    await Batch.create(req.body);
    req.flash("error", "Batch created.");
    return res.redirect("/batch/create");
  } else {
    req.flash("error", "Batch already exists.");
    return res.redirect("back");
  }
};
