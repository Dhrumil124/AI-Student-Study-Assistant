const express = require("express");

const router = express.Router();

const {
  predictGrade,
} = require("../controllers/gradePredictorController");

router.post("/", predictGrade);

module.exports = router;