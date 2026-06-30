const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
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

    question: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
      },
    ],

    correctAnswer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);