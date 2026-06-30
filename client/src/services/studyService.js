import api from "./api";

// Upload Study Material
export const uploadStudyMaterial = async (formData) => {
  const response = await api.post("/study/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get All Materials
export const getStudyMaterials = async () => {
  const response = await api.get("/study");

  return response.data;
};

// Delete Material
export const deleteStudyMaterial = async (id) => {
  const response = await api.delete(`/study/${id}`);

  return response.data;
};