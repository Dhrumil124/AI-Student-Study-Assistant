import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFlashcards } from "../services/flashcardService";

function Flashcards() {

  const { studyMaterialId } = useParams();

  const [cards, setCards] = useState([]);

  useEffect(() => {

    if (studyMaterialId) {
      loadFlashcards();
    }

  }, [studyMaterialId]);

  const loadFlashcards = async () => {

    try {

      const response = await getFlashcards(studyMaterialId);

      setCards(response.data);

    } catch (error) {
      console.error(error);
    }

  };

  // If user opened Flashcards from sidebar
  if (!studyMaterialId) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">

        <h1 className="text-4xl font-bold mb-6">
          AI Flashcards
        </h1>

        <p className="text-lg text-gray-600">
          Go to <span className="font-semibold">Study Materials</span> and click
          <span className="font-semibold text-indigo-700">
            {" "}Generate Flashcards
          </span>{" "}
          for any uploaded PDF.
        </p>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">

      <h1 className="text-3xl font-bold mb-8">
        AI Flashcards
      </h1>

      {cards.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500">
            No flashcards found.
          </p>
        </div>

      ) : (

        <div className="grid gap-5">

          {cards.map((card) => (

            <div
              key={card._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >

              <h2 className="text-xl font-bold text-indigo-700">
                Q. {card.question}
              </h2>

              <p className="mt-4 text-gray-700">
                {card.answer}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Flashcards;