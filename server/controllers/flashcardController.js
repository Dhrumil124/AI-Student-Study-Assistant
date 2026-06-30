const path = require("path");

const StudyMaterial = require("../models/StudyMaterial");
const Flashcard = require("../models/Flashcard");

const { extractTextFromPDF } = require("../services/pdfService");
const { generateFlashcards } = require("../services/groqService");

// Generate Flashcards
const generateFlashcardsFromMaterial = async (req, res) => {
  try {
    const { studyMaterialId } = req.body;

    // Check ID
    if (!studyMaterialId) {
      return res.status(400).json({
        success: false,
        message: "Study Material ID is required.",
      });
    }

    // Find uploaded study material
    const material = await StudyMaterial.findById(studyMaterialId);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Study material not found.",
      });
    }

    // Read PDF
    const pdfPath = path.join(__dirname, "..", material.filePath);

    const extractedText = await extractTextFromPDF(pdfPath);

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from PDF.",
      });
    }

    // Generate AI Flashcards
    const flashcards = await generateFlashcards(extractedText);

    // Remove old flashcards (if already generated)
    await Flashcard.deleteMany({
      studyMaterialId,
    });

    // Save new flashcards
    const savedFlashcards = [];

    for (const card of flashcards) {
      const flashcard = await Flashcard.create({
        studyMaterialId,
        question: card.question,
        answer: card.answer,
      });

      savedFlashcards.push(flashcard);
    }

    res.status(200).json({
      success: true,
      message: "Flashcards generated successfully.",
      totalFlashcards: savedFlashcards.length,
      data: savedFlashcards,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Flashcards
const getFlashcards = async (req, res) => {
  try {
    const { studyMaterialId } = req.params;

    const flashcards = await Flashcard.find({
      studyMaterialId,
    });

    res.status(200).json({
      success: true,
      total: flashcards.length,
      data: flashcards,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateFlashcardsFromMaterial,
  getFlashcards,
};