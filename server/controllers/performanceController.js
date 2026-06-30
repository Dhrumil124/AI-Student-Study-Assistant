const Performance = require("../models/Performance");

// Save Quiz Result
const savePerformance = async (req, res) => {
  try {
    const performance = await Performance.create(req.body);

    res.status(201).json({
      success: true,
      message: "Performance saved successfully.",
      data: performance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Results
const getPerformance = async (req, res) => {
  try {

    const results = await Performance.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: results,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  savePerformance,
  getPerformance,
};