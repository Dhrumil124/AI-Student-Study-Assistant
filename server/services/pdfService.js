const fs = require("fs");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  try {
    console.log("PDF Path:", filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error("PDF file not found.");
    }

    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    console.log(data.text);

    const cleanedText = data.text
  .replace(/\s+/g, " ")
  .trim()
  .substring(0, 12000);

return cleanedText;
  } catch (error) {
    console.error(error);

    throw new Error("Unable to read PDF.");
  }
};

module.exports = {
  extractTextFromPDF,
};