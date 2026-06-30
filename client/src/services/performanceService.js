import api from "./api";

export const savePerformance = async (data) => {
  const response = await api.post("/performance", data);
  return response.data;
};

export const getPerformance = async () => {
  const response = await api.get("/performance");
  return response.data;
};