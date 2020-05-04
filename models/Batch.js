const mongoose = require("mongoose");
// Schema for user
const BatchSchema = new mongoose.Schema({
  batch_name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Batch", BatchSchema);
