const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder if it doesn't exist
const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".txt",
  ];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, PPT, PPTX and TXT files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;