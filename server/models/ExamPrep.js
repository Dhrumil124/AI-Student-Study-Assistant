const mongoose = require("mongoose");

const examPrepSchema = new mongoose.Schema(
  {
    studyMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyMaterial",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExamPrep", examPrepSchema);