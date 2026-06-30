import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuiz } from "../services/quizService";
import { savePerformance } from "../services/performanceService";

function Quiz() {
  const { studyMaterialId } = useParams();

  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (studyMaterialId) {
      loadQuiz();
    }
  }, [studyMaterialId]);

  const loadQuiz = async () => {
    try {
      const response = await getQuiz(studyMaterialId);
      setQuiz(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const score = quiz.filter(
    (q) => answers[q._id] === q.correctAnswer
  ).length;

  const submitQuiz = async () => {
    try {
      await savePerformance({
        studyMaterialId,
        title: quiz[0]?.title || "Quiz",
        subject: quiz[0]?.title || "General",
        totalQuestions: quiz.length,
        score,
        percentage:
          quiz.length > 0
            ? Math.round((score / quiz.length) * 100)
            : 0,
      });

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Unable to save performance.");
    }
  };

  if (!studyMaterialId) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">
          📝 AI Quiz
        </h1>

        <p className="mt-5 text-gray-600">
          Generate a Quiz from Study Materials.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">

      <h1 className="text-4xl font-bold mb-8">
        📝 AI Quiz
      </h1>

      {quiz.map((q, index) => (

        <div
          key={q._id}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >

          <h2 className="font-bold text-xl mb-5">
            {index + 1}. {q.question}
          </h2>

          {q.options.map((option) => (

            <label
              key={option}
              className="flex gap-3 py-2 cursor-pointer"
            >

              <input
                type="radio"
                name={q._id}
                value={option}
                disabled={submitted}
                checked={answers[q._id] === option}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [q._id]: option,
                  })
                }
              />

              {option}

            </label>

          ))}

          {submitted && (

            <p className="mt-4 text-green-700 font-semibold">
              ✅ Correct Answer: {q.correctAnswer}
            </p>

          )}

        </div>

      ))}

      {!submitted ? (

        <button
          onClick={submitQuiz}
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg transition"
        >
          Submit Quiz
        </button>

      ) : (

        <div className="bg-green-100 border border-green-400 rounded-xl p-6 text-center mt-8">

          <h2 className="text-3xl font-bold">
            🎉 Score: {score} / {quiz.length}
          </h2>

          <p className="mt-3 text-lg">
            Accuracy:{" "}
            {quiz.length > 0
              ? Math.round((score / quiz.length) * 100)
              : 0}
            %
          </p>

        </div>

      )}

    </div>
  );
}

export default Quiz;