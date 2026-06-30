import api from "./api";

export const generateFlashcards = async (studyMaterialId) => {
  const response = await api.post("/flashcards/generate", {
    studyMaterialId,
  });

  return response.data;
};

export const getFlashcards = async (studyMaterialId) => {
  const response = await api.get(`/flashcards/${studyMaterialId}`);

  return response.data;
};