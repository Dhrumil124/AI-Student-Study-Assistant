const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

const connectDB = require("./config/db");
const studyRoutes = require("./routes/studyRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const mindMapRoutes = require("./routes/mindMapRoutes");
const formulaSheetRoutes = require("./routes/formulaSheetRoutes");
const quizRoutes = require("./routes/quizRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const gradePredictorRoutes = require("./routes/gradePredictorRoutes");
const examPrepRoutes = require("./routes/examPrepRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/study", studyRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/mindmaps", mindMapRoutes);
app.use("/api/formulas", formulaSheetRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/grade-predictor", gradePredictorRoutes);
app.use("/api/exam-prep", examPrepRoutes);
app.use("/api/collaboration", collaborationRoutes);

app.get("/", (req, res) => {
  res.send("AI Student Study Assistant API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});