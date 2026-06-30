const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  uploadStudyMaterial,
  getStudyMaterials,
  deleteStudyMaterial,
} = require("../controllers/studyController");

router.post(
  "/upload",
  upload.single("file"),
  uploadStudyMaterial
);

router.get("/", getStudyMaterials);

router.delete("/:id", deleteStudyMaterial);

module.exports = router;