import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import StudyMaterial from "../pages/StudyMaterial";
import Flashcards from "../pages/Flashcards";
import MindMaps from "../pages/MindMaps";
import FormulaSheets from "../pages/FormulaSheets";
import Quiz from "../pages/Quiz";
import Performance from "../pages/Performance";
import GradePredictor from "../pages/GradePredictor";
import ExamPrep from "../pages/ExamPrep";
import Collaboration from "../pages/Collaboration";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path="/" element={<Dashboard />} />

        <Route path="/study-materials" element={<StudyMaterial />} />

        {/* Flashcards */}
        <Route path="/flashcards" element={<Flashcards />} />
        <Route
          path="/flashcards/:studyMaterialId"
          element={<Flashcards />}
        />

        {/* Mind Maps */}
        <Route path="/mind-maps" element={<MindMaps />} />
        <Route
          path="/mind-maps/:studyMaterialId"
          element={<MindMaps />}
        />

        {/* Formula Sheets */}
        <Route path="/formula-sheets" element={<FormulaSheets />} />
        <Route
          path="/formula-sheets/:studyMaterialId"
          element={<FormulaSheets />}
        />

        {/* Quiz */}
        <Route path="/quiz" element={<Quiz />} />
        <Route
          path="/quiz/:studyMaterialId"
          element={<Quiz />}
        />

        {/* Performance */}
        <Route
          path="/performance"
          element={<Performance />}
        />

        {/* Grade Predictor */}
        <Route
          path="/grade-predictor"
          element={<GradePredictor />}
        />

        {/* Exam Preparation */}
        <Route
          path="/exam-prep"
          element={<ExamPrep />}
        />
        <Route
          path="/exam-prep/:studyMaterialId"
          element={<ExamPrep />}
        />

        {/* Collaboration */}
        <Route
          path="/collaboration"
          element={<Collaboration />}
        />

      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;