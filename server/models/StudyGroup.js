const mongoose = require("mongoose");

const studyGroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    members: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudyGroup", studyGroupSchema);