const path = require("path");

const StudyMaterial = require("../models/StudyMaterial");
const FormulaSheet = require("../models/FormulaSheet");

const { extractTextFromPDF } = require("../services/pdfService");
const { generateFormulaSheet } = require("../services/groqService");

const generateFormulaSheetFromMaterial = async (req, res) => {
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

    const formulaSheet = await generateFormulaSheet(text);

    await FormulaSheet.deleteMany({
      studyMaterialId,
    });

    const saved = await FormulaSheet.create({
      studyMaterialId,
      title: material.title,
      content: formulaSheet,
    });

    res.status(200).json({
      success: true,
      message: "Formula Sheet generated successfully.",
      data: saved,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getFormulaSheet = async (req, res) => {
  try {

    const { studyMaterialId } = req.params;

    const sheet = await FormulaSheet.findOne({
      studyMaterialId,
    });

    res.status(200).json({
      success: true,
      data: sheet,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  generateFormulaSheetFromMaterial,
  getFormulaSheet,
};