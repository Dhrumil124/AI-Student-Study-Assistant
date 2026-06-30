const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ============================
// Generate AI Flashcards
// ============================
const generateFlashcards = async (studyContent) => {
  try {
    const prompt = `
You are an expert AI Study Assistant.

Generate exactly 10 flashcards from the study material.

Rules:
1. Return ONLY valid JSON.
2. No markdown.
3. No explanations.

Format:

[
  {
    "question":"Question",
    "answer":"Answer"
  }
]

Study Material:

${studyContent.substring(0, 8000)}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let response = completion.choices[0].message.content.trim();

    response = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(response);

  } catch (error) {

    console.error("Groq Flashcard Error:", error);

    throw new Error("Failed to generate flashcards.");

  }
};

// ============================
// Generate AI Mind Map
// ============================
const generateMindMap = async (studyContent) => {
  try {
    const prompt = `
Generate a hierarchical Mind Map.

Rules:
- Plain text only.
- No markdown.
- Short points.

Study Material:

${studyContent.substring(0, 8000)}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content.trim();

  } catch (error) {

    console.error("Groq Mind Map Error:", error);

    throw new Error("Failed to generate mind map.");

  }
};

// ============================
// Generate Formula Sheet
// ============================
const generateFormulaSheet = async (studyContent) => {
  try {
    const prompt = `
Read the study material and generate a Formula Sheet.

Extract:

FORMULAS
EQUATIONS
DEFINITIONS
SYNTAX
RULES
KEY POINTS

Rules:

- Plain text only.
- No markdown.
- If formulas don't exist write:
No formulas found.

Study Material:

${studyContent.substring(0, 8000)}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content.trim();

  } catch (error) {

    console.error("Groq Formula Sheet Error:", error);

    throw new Error("Failed to generate Formula Sheet.");

  }
};

// ============================
// Generate Quiz
// ============================
const generateQuiz = async (studyContent) => {
  try {
    const prompt = `
Generate exactly 10 MCQs.

Rules:

1. Exactly 10 questions.
2. Four options each.
3. One correct answer.
4. Return ONLY JSON.
5. No markdown.

Format:

[
  {
    "question":"Question",
    "options":[
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correctAnswer":"Option A"
  }
]

Study Material:

${studyContent.substring(0, 8000)}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let response = completion.choices[0].message.content.trim();

    response = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(response);

  } catch (error) {

    console.error("Groq Quiz Error:", error);

    throw new Error("Failed to generate quiz.");

  }
};

// ============================
// Generate Grade Prediction
// ============================
const generateGradePrediction = async (studentData) => {
  try {
    const prompt = `
You are an AI Academic Advisor.

Predict the student's final academic performance.

Student Details:

Subject: ${studentData.subject}

Internal Marks: ${studentData.internalMarks}/30

Assignment Marks: ${studentData.assignmentMarks}/20

Attendance: ${studentData.attendance}%

Mid Exam Marks: ${studentData.midMarks}/20

Preparation Level: ${studentData.preparationLevel}

Instructions:

1. Return ONLY one valid JSON object.
2. Do NOT use markdown.
3. Do NOT explain anything.
4. Do NOT write any text before or after the JSON.
5. Output must start with { and end with }.

Format:

{
  "predictedGrade":"A",
  "predictedPercentage":84,
  "confidence":88,
  "suggestions":[
    "Revise important concepts",
    "Practice previous year papers",
    "Improve attendance"
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Print raw response for debugging
    console.log("Groq Response:");
    console.log(completion.choices[0].message.content);

    let response = completion.choices[0].message.content;

    response = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract only JSON object
    const start = response.indexOf("{");
    const end = response.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON received from Groq.");
    }

    const json = response.substring(start, end + 1);

    return JSON.parse(json);

  } catch (error) {

    console.error("Groq Grade Prediction Error:");
    console.error(error);

    throw new Error("Failed to predict grade.");

  }
};

// ============================
// Generate Exam Preparation Plan
// ============================
const generateExamPrep = async (studyContent) => {
  try {
    const prompt = `
You are an expert AI Study Assistant.

Create a complete Exam Preparation Plan.

Return plain text only.

Include exactly these sections:

7 DAY STUDY PLAN

IMPORTANT TOPICS

REVISION STRATEGY

LAST MINUTE CHECKLIST

EXAM TIPS

Rules:

1. Keep points short.
2. Use numbered lists.
3. No markdown.
4. No explanations.
5. Make it easy for students to revise.

Study Material:

${studyContent.substring(0, 8000)}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content.trim();

  } catch (error) {

    console.error("Groq Exam Prep Error:");
    console.error(error);

    throw new Error("Failed to generate Exam Preparation.");

  }
};

module.exports = {
  generateFlashcards,
  generateMindMap,
  generateFormulaSheet,
  generateQuiz,
  generateGradePrediction,
  generateExamPrep,
};