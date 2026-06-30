import api from "./api";

export const generateFormulaSheet = async (studyMaterialId) => {
  const response = await api.post("/formulas/generate", {
    studyMaterialId,
  });

  return response.data;
};

export const getFormulaSheet = async (studyMaterialId) => {
  const response = await api.get(`/formulas/${studyMaterialId}`);

  return response.data;
};