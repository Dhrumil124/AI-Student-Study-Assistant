const express = require("express");

const router = express.Router();

const {
  generateFlashcardsFromMaterial,
  getFlashcards,
} = require("../controllers/flashcardController");

// Generate AI Flashcards
router.post("/generate", generateFlashcardsFromMaterial);

// Get Flashcards by Study Material ID
router.get("/:studyMaterialId", getFlashcards);

module.exports = router;