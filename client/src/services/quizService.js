import api from "./api";

export const generateQuiz = async (studyMaterialId) => {
  const response = await api.post("/quiz/generate", {
    studyMaterialId,
  });

  return response.data;
};

export const getQuiz = async (studyMaterialId) => {
  const response = await api.get(`/quiz/${studyMaterialId}`);

  return response.data;
};