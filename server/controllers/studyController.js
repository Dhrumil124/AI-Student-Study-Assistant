const fs = require("fs");
const path = require("path");

const StudyMaterial = require("../models/StudyMaterial");

// Upload Study Material
const uploadStudyMaterial = async (req, res) => {
  try {
    const { title, materialType, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file.",
      });
    }

    const studyMaterial = await StudyMaterial.create({
      title,
      materialType,
      subject,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
    });

    res.status(201).json({
      success: true,
      message: "Study material uploaded successfully.",
      data: studyMaterial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Study Materials
const getStudyMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Study Material
const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Study material not found.",
      });
    }

    // Delete the uploaded file
    const filePath = path.join(__dirname, "..", material.filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete MongoDB document
    await StudyMaterial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Study material deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadStudyMaterial,
  getStudyMaterials,
  deleteStudyMaterial,
};