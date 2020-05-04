const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema for user
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Encrypt password
EmployeeSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Match user password to hashed password in database
EmployeeSchema.methods.matchPassword = async function (enteredPassword) {
  const answer = await bcrypt.compare(enteredPassword, this.password);
  return answer;
};

module.exports = mongoose.model("Employee", EmployeeSchema);
