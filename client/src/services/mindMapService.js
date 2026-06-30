import api from "./api";

export const generateMindMap = async (studyMaterialId) => {
  const response = await api.post("/mindmaps/generate", {
    studyMaterialId,
  });

  return response.data;
};

export const getMindMap = async (studyMaterialId) => {
  const response = await api.get(`/mindmaps/${studyMaterialId}`);

  return response.data;
};