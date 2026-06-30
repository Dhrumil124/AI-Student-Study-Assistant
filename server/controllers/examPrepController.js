const StudyMaterial = require("../models/StudyMaterial");
const ExamPrep = require("../models/ExamPrep");

const { extractTextFromPDF } = require("../services/pdfService");
const { generateExamPrep } = require("../services/groqService");

// Generate Exam Prep
const generateExamPreparation = async (req, res) => {
  try {
    const { studyMaterialId } = req.params;

    const existing = await ExamPrep.findOne({ studyMaterialId });

    if (existing) {
      return res.json({
        message: "Exam Preparation already exists.",
        data: existing,
      });
    }

    const material = await StudyMaterial.findById(studyMaterialId);

    if (!material) {
      return res.status(404).json({
        message: "Study material not found.",
      });
    }

    const studyContent = await extractTextFromPDF(material.filePath);

    const examPrep = await generateExamPrep(studyContent);

    const saved = await ExamPrep.create({
      studyMaterialId,
      content: examPrep,
    });

    res.status(201).json({
      message: "Exam Preparation generated successfully.",
      data: saved,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to generate Exam Preparation.",
    });

  }
};

// Get Exam Prep
const getExamPreparation = async (req, res) => {
  try {

    const { studyMaterialId } = req.params;

    const examPrep = await ExamPrep.findOne({
      studyMaterialId,
    });

    if (!examPrep) {
      return res.status(404).json({
        message: "Exam Preparation not found.",
      });
    }

    res.json(examPrep);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  generateExamPreparation,
  getExamPreparation,
};