const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true
    },
    major: {
      type: String,
      required: true,
      trim: true
    },
    gpa: {
      type: Number,
      required: true,
      min: 0,
      max: 4
    }
  },
  { timestamps: true }
);

studentSchema.index({ name: 1 });

module.exports = mongoose.model("Student", studentSchema);
