const Student = require("../models/Student");
const Batch = require("../models/Batch");

// @desc    Create student page
// @route   GET /student/create
module.exports.get_create_student = async (req, res) => {
  const batches = await Batch.find();
  return res.render("add_student", {
    title: "New Student",
    batches,
    errorMessage: req.flash("error"),
  });
};

// @desc    Create student page
// @route   POST /student/create
module.exports.post_create_student = async (req, res) => {
  console.log(req.body);
  const { name, email, batch, college, placement_status } = req.body;
  const student = await Student.findOne({ email });
  if (!student) {
    const emp = await Student.create({ name, email, batch, college, placement_status });
    req.flash("error", "Student created.");
    return res.redirect("/student/create");
  } else {
    req.flash("error", "Another student exists with given email");
    return res.redirect("back");
  }
};

// @desc    Show all students page
// @route   GET /student/view-all
module.exports.get_all_students = async (req, res) => {
  const students = await Student.find();
  return res.render("student", {
    title: "Student Details",
    students,
    errorMessage: req.flash("error"),
  });
};

// @desc    Update student details
// @route   GET /student/:id
module.exports.get_update_student = async (req, res) => {
  const student = await Student.findById(req.params.id);
  return res.render("update_student", {
    title: "Update Student Details",
    student,
    errorMessage: req.flash("error"),
  });
};

// @desc    Update student details
// @route   POST /student/:id
module.exports.post_update_student = async (req, res) => {
  const { dsa_score, web_score, react_score } = req.body;
  await Student.findOneAndUpdate({ _id: req.params.id }, { dsa_score, web_score, react_score });
  console.log(dsa_score, web_score, react_score);
  return res.redirect("/student/view-all");
};
