const Interview = require("../models/Interview");
const Student = require("../models/Student");

// @desc    Create an interview
// @route   GET /interview/create
module.exports.get_create_interview = (req, res) => {
  return res.render("interview", {
    title: "Add Interview",
    errorMessage: req.flash("error"),
  });
};

// @desc    Create an interview
// @route   POST /interview/create
module.exports.post_create_interview = async (req, res) => {
  await Interview.create(req.body);

  return res.redirect("/interview/view-all");
};

// @desc    Get all interviews
// @route   GET /interview/view-all
module.exports.get_all_interviews = async (req, res) => {
  const interviews = await Interview.find();

  return res.render("all_interview", {
    title: "All Interviews",
    interviews,
  });
};

// @desc    Get details of an interview
// @route   GET /interview/:id
module.exports.get_interview = async (req, res) => {
  const interview = await Interview.findById(req.params.id).populate("student_applied.student_details");
  return res.render("interview_details", {
    title: "Applied student list",
    interview,
    students: interview.student_applied,
    errorMessage: req.flash("error"),
  });
};

// @desc    Allocate a student to an interview
// @route   GET /interview/apply
module.exports.get_apply = async (req, res) => {
  const interviews = await Interview.find();
  const students = await Student.find();
  return res.render("apply", {
    title: "Apply for interview",
    interviews,
    students,
    errorMessage: req.flash("error"),
  });
};

// @desc    Allocate a student to an interview
// @route   POST /interview/apply
module.exports.post_apply = async (req, res) => {
  let interview = await Interview.find({ _id: req.body.interview, "student_applied.student_details": req.body.student });
  if (interview.length > 0) {
    console.log(interview);
    req.flash("error", "Student already applied.");
    return res.redirect(`/interview/apply`);
  } else {
    interview = await Interview.findById(req.body.interview);
    interview.student_applied.push({
      student_details: req.body.student,
    });
    interview.save();
  }

  return res.redirect(`/interview/apply`);
};

// @desc    Update interview status of a student
// @route   POST /interview/:id/student
module.exports.post_update_status = async (req, res) => {
  await Interview.updateOne({ _id: req.params.id, "student_applied._id": req.params.student }, { $set: { "student_applied.$.result": req.body.placement_status } });
  return res.redirect(`/interview/${req.params.id}`);
};
