import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  uploadStudyMaterial,
  getStudyMaterials,
  deleteStudyMaterial,
} from "../services/studyService";

import { generateFlashcards } from "../services/flashcardService";
import { generateMindMap } from "../services/mindMapService";
import { generateFormulaSheet } from "../services/formulaSheetService";
import { generateQuiz } from "../services/quizService";
import { generateExamPrep } from "../services/examPrepService";


import UploadMaterialForm from "../components/UploadMaterialForm";
import MaterialCard from "../components/MaterialCard";

function StudyMaterial() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [materialType, setMaterialType] = useState("Notes");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await getStudyMaterials();
      setMaterials(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleUpload = async () => {
    if (!title || !subject || !file) {
      alert("Please fill all fields and select a file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("materialType", materialType);
      formData.append("file", file);

      const response = await uploadStudyMaterial(formData);

      alert(response.message);

      setTitle("");
      setSubject("");
      setMaterialType("Notes");
      setFile(null);

      document.getElementById("studyFile").value = "";

      fetchMaterials();

    } catch (error) {

      alert(error.response?.data?.message || "Upload failed.");

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this study material?")) return;

    try {

      await deleteStudyMaterial(id);

      fetchMaterials();

    } catch (error) {

      console.error(error);

    }

  };

  const handleGenerateFlashcards = async (studyMaterialId) => {

    try {

      setLoading(true);

      const response = await generateFlashcards(studyMaterialId);

      alert(response.message);

      navigate(`/flashcards/${studyMaterialId}`);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to generate flashcards."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleGenerateMindMap = async (studyMaterialId) => {

    try {

      setLoading(true);

      const response = await generateMindMap(studyMaterialId);

      alert(response.message);

      navigate(`/mind-maps/${studyMaterialId}`);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to generate mind map."
      );

    } finally {

      setLoading(false);

    }

  };

const handleGenerateFormulaSheet = async (studyMaterialId) => {
  try {
    setLoading(true);

    const response = await generateFormulaSheet(studyMaterialId);

    alert(response.message);

    navigate(`/formula-sheets/${studyMaterialId}`);
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Failed to generate Formula Sheet."
    );
  } finally {
    setLoading(false);
  }
};

const handleGenerateQuiz = async (studyMaterialId) => {
  try {
    setLoading(true);

    const response = await generateQuiz(studyMaterialId);

    alert(response.message);

    navigate(`/quiz/${studyMaterialId}`);
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to generate quiz."
    );
  } finally {
    setLoading(false);
  }
};

const handleGenerateExamPrep = async (studyMaterialId) => {
  try {
    setLoading(true);

    const response = await generateExamPrep(studyMaterialId);

    alert(response.message);

    navigate(`/exam-prep/${studyMaterialId}`);

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to generate Exam Preparation."
    );

  } finally {

    setLoading(false);

  }
};


  return (
    <div className="max-w-6xl mx-auto py-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Study Materials
      </h1>

      <UploadMaterialForm
        title={title}
        setTitle={setTitle}
        subject={subject}
        setSubject={setSubject}
        materialType={materialType}
        setMaterialType={setMaterialType}
        setFile={setFile}
        loading={loading}
        handleUpload={handleUpload}
      />

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Uploaded Materials
        </h2>

        {materials.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No study materials uploaded yet.
          </div>

        ) : (

          <div className="space-y-5">

            {materials.map((item) => (

              <MaterialCard
                key={item._id}
                item={item}
                handleDelete={handleDelete}
                handleGenerateFlashcards={handleGenerateFlashcards}
                handleGenerateMindMap={handleGenerateMindMap}
                 handleGenerateFormulaSheet={handleGenerateFormulaSheet}
                 handleGenerateQuiz={handleGenerateQuiz}
                 handleGenerateExamPrep={handleGenerateExamPrep}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default StudyMaterial;