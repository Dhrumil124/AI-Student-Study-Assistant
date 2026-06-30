import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getExamPrep } from "../services/examPrepService";

function ExamPrep() {
  const { studyMaterialId } = useParams();

  const [examPrep, setExamPrep] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (studyMaterialId) {
      loadExamPrep();
    }
  }, [studyMaterialId]);

  const loadExamPrep = async () => {
    try {
      setLoading(true);

      const response = await getExamPrep(studyMaterialId);

      // ✅ FIX
      setExamPrep(response);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!studyMaterialId) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold text-pink-700">
          📚 Exam Preparation
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Generate an Exam Preparation Plan from the
          <span className="font-semibold"> Study Materials </span>
          page.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-14 h-14 mx-auto rounded-full border-4 border-pink-200 border-t-pink-700 animate-spin"></div>

        <p className="mt-5 text-xl font-semibold">
          Loading Exam Preparation...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">

      <div className="bg-gradient-to-r from-pink-600 to-red-600 rounded-3xl p-8 shadow-xl text-white">
        <h1 className="text-4xl font-bold">
          📚 AI Exam Preparation
        </h1>

        <p className="mt-2 text-pink-100">
          AI Generated Study Plan for Exams
        </p>
      </div>

      {examPrep ? (
        <div className="mt-8 bg-white rounded-2xl shadow-xl border p-8">
          <div className="whitespace-pre-wrap leading-8 text-gray-800">
            {examPrep.content}
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-10 text-center text-gray-500">
          No Exam Preparation Found.
        </div>
      )}

    </div>
  );
}

export default ExamPrep;