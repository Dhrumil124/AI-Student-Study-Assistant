import { useEffect, useState } from "react";

import { getPerformance } from "../services/performanceService";

function Performance() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadPerformance();
  }, []);

  const loadPerformance = async () => {
    try {
      const response = await getPerformance();
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalQuiz = results.length;

  const highest =
    totalQuiz > 0
      ? Math.max(...results.map((r) => r.score))
      : 0;

  const lowest =
    totalQuiz > 0
      ? Math.min(...results.map((r) => r.score))
      : 0;

  const average =
    totalQuiz > 0
      ? (
          results.reduce((sum, r) => sum + r.percentage, 0) /
          totalQuiz
        ).toFixed(1)
      : 0;

  return (
    <div className="max-w-7xl mx-auto py-8">

      <h1 className="text-4xl font-bold mb-8">
        📊 Performance Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-indigo-600 text-white rounded-xl p-6">
          <h3>Total Quizzes</h3>
          <p className="text-4xl font-bold mt-3">
            {totalQuiz}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h3>Average</h3>
          <p className="text-4xl font-bold mt-3">
            {average}%
          </p>
        </div>

        <div className="bg-orange-600 text-white rounded-xl p-6">
          <h3>Highest</h3>
          <p className="text-4xl font-bold mt-3">
            {highest}
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">
          <h3>Lowest</h3>
          <p className="text-4xl font-bold mt-3">
            {lowest}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Quiz Attempts
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Title</th>
              <th className="text-left py-3">Score</th>
              <th className="text-left py-3">Percentage</th>
              <th className="text-left py-3">Date</th>

            </tr>

          </thead>

          <tbody>

            {results.map((item) => (

              <tr
                key={item._id}
                className="border-b"
              >

                <td className="py-3">
                  {item.title}
                </td>

                <td className="py-3">
                  {item.score}/{item.totalQuestions}
                </td>

                <td className="py-3">
                  {item.percentage}%
                </td>

                <td className="py-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Performance;