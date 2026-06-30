import api from "./api";

export const generateExamPrep = async (studyMaterialId) => {
  const response = await api.post(`/exam-prep/${studyMaterialId}`);
  return response.data;
};

export const getExamPrep = async (studyMaterialId) => {
  const response = await api.get(`/exam-prep/${studyMaterialId}`);
  return response.data;
};