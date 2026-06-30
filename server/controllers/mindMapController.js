const path = require("path");

const StudyMaterial = require("../models/StudyMaterial");
const MindMap = require("../models/MindMap");

const { extractTextFromPDF } = require("../services/pdfService");
const { generateMindMap } = require("../services/groqService");

// Generate Mind Map
const generateMindMapFromMaterial = async (req, res) => {
  try {
    const { studyMaterialId } = req.body;

    if (!studyMaterialId) {
      return res.status(400).json({
        success: false,
        message: "Study Material ID is required.",
      });
    }

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

    const mindMap = await generateMindMap(text);

    await MindMap.deleteMany({
      studyMaterialId,
    });

    const savedMindMap = await MindMap.create({
      studyMaterialId,
      title: material.title,
      content: mindMap,
    });

    res.status(200).json({
      success: true,
      message: "Mind Map generated successfully.",
      data: savedMindMap,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Mind Map
const getMindMap = async (req, res) => {
  try {

    const { studyMaterialId } = req.params;

    const mindMap = await MindMap.findOne({
      studyMaterialId,
    });

    res.status(200).json({
      success: true,
      data: mindMap,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  generateMindMapFromMaterial,
  getMindMap,
};