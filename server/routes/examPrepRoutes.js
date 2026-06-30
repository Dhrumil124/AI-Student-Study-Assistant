const express = require("express");

const router = express.Router();

const {
  generateExamPreparation,
  getExamPreparation,
} = require("../controllers/examPrepController");

router.post("/:studyMaterialId", generateExamPreparation);

router.get("/:studyMaterialId", getExamPreparation);

module.exports = router;