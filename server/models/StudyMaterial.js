const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    materialType: {
      type: String,
      enum: ["Notes", "Textbook", "Past Paper"],
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);