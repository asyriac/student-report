const mongoose = require("mongoose");
// Schema for student
const InterviewSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  student_applied: [
    {
      student_details: {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
      },
      result: {
        type: String,
        enum: ["PASS", "FAIL", "ON HOLD", "DID NOT ATTEMPT", "APPLIED"],
        default: "APPLIED",
      },
    },
  ],
});

module.exports = mongoose.model("Interview", InterviewSchema);
