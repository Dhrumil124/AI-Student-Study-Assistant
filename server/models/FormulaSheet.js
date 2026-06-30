const mongoose = require("mongoose");

const formulaSheetSchema = new mongoose.Schema(
  {
    studyMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyMaterial",
      required: true,
    },

    title: {
      type: String,
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

module.exports = mongoose.model("FormulaSheet", formulaSheetSchema);