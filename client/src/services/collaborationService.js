import api from "./api";

export const createGroup = async (data) => {
  const response = await api.post("/collaboration", data);
  return response.data;
};

export const getGroups = async () => {
  const response = await api.get("/collaboration");
  return response.data;
};

export const joinGroup = async (id) => {
  const response = await api.post(`/collaboration/${id}/join`);
  return response.data;
};

export const leaveGroup = async (id) => {
  const response = await api.post(`/collaboration/${id}/leave`);
  return response.data;
};

export const deleteGroup = async (id) => {
  const response = await api.delete(`/collaboration/${id}`);
  return response.data;
};