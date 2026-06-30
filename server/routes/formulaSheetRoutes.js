const express = require("express");

const router = express.Router();

const {
  generateFormulaSheetFromMaterial,
  getFormulaSheet,
} = require("../controllers/formulaSheetController");

router.post("/generate", generateFormulaSheetFromMaterial);

router.get("/:studyMaterialId", getFormulaSheet);

module.exports = router;