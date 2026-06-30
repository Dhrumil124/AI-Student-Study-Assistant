const path = require("path");

const StudyMaterial = require("../models/StudyMaterial");
const Quiz = require("../models/Quiz");

const { extractTextFromPDF } = require("../services/pdfService");
const { generateQuiz } = require("../services/groqService");

const generateQuizFromMaterial = async (req, res) => {
  try {

    const { studyMaterialId } = req.body;

    const material = await StudyMaterial.findById(studyMaterialId);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Study Material not found.",
      });
    }

    const pdfPath = path.join(
      process.cwd(),
      material.filePath.replace(/\\/g, "/")
    );

    const text = await extractTextFromPDF(pdfPath);

    const quiz = await generateQuiz(text);

    await Quiz.deleteMany({
      studyMaterialId,
    });

    const savedQuiz = [];

    for (const item of quiz) {

      const saved = await Quiz.create({
        studyMaterialId,
        title: material.title,
        question: item.question,
        options: item.options,
        correctAnswer: item.correctAnswer,
      });

      savedQuiz.push(saved);
    }

    res.status(200).json({
      success: true,
      message: "Quiz generated successfully.",
      data: savedQuiz,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getQuiz = async (req, res) => {
  try {

    const { studyMaterialId } = req.params;

    const quiz = await Quiz.find({
      studyMaterialId,
    });

    res.status(200).json({
      success: true,
      data: quiz,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  generateQuizFromMaterial,
  getQuiz,
};