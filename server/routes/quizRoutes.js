const express = require("express");

const router = express.Router();

const {
  generateQuizFromMaterial,
  getQuiz,
} = require("../controllers/quizController");

router.post("/generate", generateQuizFromMaterial);

router.get("/:studyMaterialId", getQuiz);

module.exports = router;