const express = require("express");

const router = express.Router();

const {
  savePerformance,
  getPerformance,
} = require("../controllers/performanceController");

router.post("/", savePerformance);

router.get("/", getPerformance);

module.exports = router;