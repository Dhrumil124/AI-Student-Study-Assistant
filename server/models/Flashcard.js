const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
  {
    studyMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyMaterial",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flashcard", flashcardSchema);