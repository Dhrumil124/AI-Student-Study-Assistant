import api from "./api";

export const predictGrade = async (data) => {
  const response = await api.post("/grade-predictor", data);
  return response.data;
};