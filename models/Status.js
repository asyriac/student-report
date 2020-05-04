const mongoose = require("mongoose");
// Schema for student
const StatusSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Interview",
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  status: {
    type: "String",
    enum: ["PASS", "FAIL", "ON HOLD", "DID NOT ATTEMPT"],
    default: "ON HOLD",
  },
});

module.exports = mongoose.model("Status", StatusSchema);
