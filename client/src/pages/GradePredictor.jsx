import { useState } from "react";
import { predictGrade } from "../services/gradePredictorService";

function GradePredictor() {
  const [formData, setFormData] = useState({
    subject: "",
    internalMarks: "",
    assignmentMarks: "",
    attendance: "",
    midMarks: "",
    preparationLevel: "Medium",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    if (
      !formData.subject ||
      !formData.internalMarks ||
      !formData.assignmentMarks ||
      !formData.attendance ||
      !formData.midMarks
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await predictGrade(formData);

      setPrediction(response.data);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Prediction failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">

      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          🎓 AI Grade Predictor
        </h1>

        <p className="mt-2 text-indigo-100">
          Predict your expected performance using AI.
        </p>

      </div>

      <div className="bg-white mt-8 rounded-2xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="internalMarks"
            placeholder="Internal Marks (30)"
            value={formData.internalMarks}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="assignmentMarks"
            placeholder="Assignment Marks (20)"
            value={formData.assignmentMarks}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="attendance"
            placeholder="Attendance %"
            value={formData.attendance}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="midMarks"
            placeholder="Mid Exam Marks (20)"
            value={formData.midMarks}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <select
            name="preparationLevel"
            value={formData.preparationLevel}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="mt-8 bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Predicting..." : "Predict Grade"}
        </button>

      </div>

      {prediction && (

        <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-indigo-700 mb-8">
            Prediction Result
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-green-100 rounded-xl p-6 text-center">
              <h3 className="font-semibold">
                Grade
              </h3>

              <p className="text-5xl font-bold mt-3">
                {prediction.predictedGrade}
              </p>
            </div>

            <div className="bg-blue-100 rounded-xl p-6 text-center">
              <h3 className="font-semibold">
                Percentage
              </h3>

              <p className="text-5xl font-bold mt-3">
                {prediction.predictedPercentage}%
              </p>
            </div>

            <div className="bg-purple-100 rounded-xl p-6 text-center">
              <h3 className="font-semibold">
                Confidence
              </h3>

              <p className="text-5xl font-bold mt-3">
                {prediction.confidence}%
              </p>
            </div>

          </div>

          <div className="mt-10">

            <h3 className="text-2xl font-bold mb-4">
              💡 Suggestions
            </h3>

            <ul className="space-y-3">

              {prediction.suggestions.map((item, index) => (

                <li
                  key={index}
                  className="bg-gray-100 rounded-lg p-4"
                >
                  ✅ {item}
                </li>

              ))}

            </ul>

          </div>

        </div>

      )}

    </div>
  );
}

export default GradePredictor;