function MaterialCard({
  item,
  handleDelete,
  handleGenerateFlashcards,
  handleGenerateMindMap,
  handleGenerateFormulaSheet,
  handleGenerateQuiz,
  handleGenerateExamPrep,
}) {
  const badgeColor =
    item.materialType === "Notes"
      ? "bg-green-100 text-green-700"
      : item.materialType === "Textbook"
      ? "bg-blue-100 text-blue-700"
      : "bg-orange-100 text-orange-700";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">

      <div>
        <h3 className="text-xl font-bold text-gray-800">
          📄 {item.title}
        </h3>

        <p className="mt-2 text-gray-600">
          <span className="font-semibold">Subject:</span> {item.subject}
        </p>

        <div className="mt-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}
          >
            {item.materialType}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">

        <button
          onClick={() => handleGenerateFlashcards(item._id)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
        >
          🧠 Flashcards
        </button>

        <button
          onClick={() => handleGenerateMindMap(item._id)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
        >
          🗺 Mind Map
        </button>

        <button
          onClick={() => handleGenerateFormulaSheet(item._id)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg transition"
        >
          📑 Formula Sheet
        </button>

        <button
          onClick={() => handleGenerateQuiz(item._id)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg transition"
        >
          📝 Quiz
        </button>


        <button
  onClick={() => handleGenerateExamPrep(item._id)}
  className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition"
>
  📚 Exam Prep
</button>

        <a
          href={`http://localhost:5000/${item.filePath.replace("\\", "/")}`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          👁 View
        </a>

        <button
          onClick={() => handleDelete(item._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default MaterialCard;