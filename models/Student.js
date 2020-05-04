const mongoose = require("mongoose");

// Schema for student
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  college: {
    type: String,
    required: true,
  },
  placement_status: {
    type: String,
    enum: ["Placed", "Not placed"],
    required: true,
  },
  dsa_score: {
    type: Number,
    default: 0,
  },
  web_score: {
    type: Number,
    default: 0,
  },
  react_score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
