const { generateGradePrediction } = require("../services/groqService");

const predictGrade = async (req, res) => {
  try {

    const prediction = await generateGradePrediction(req.body);

    res.status(200).json({
      success: true,
      data: prediction,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  predictGrade,
};