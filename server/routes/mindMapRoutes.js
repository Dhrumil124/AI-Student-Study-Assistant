const express = require("express");

const router = express.Router();

const {
  generateMindMapFromMaterial,
  getMindMap,
} = require("../controllers/mindMapController");

router.post("/generate", generateMindMapFromMaterial);

router.get("/:studyMaterialId", getMindMap);

module.exports = router;