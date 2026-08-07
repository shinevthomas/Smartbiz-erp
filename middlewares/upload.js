import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder automatically
const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});

// Allow only images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files are allowed."
      ),
      false
    );
  }
};

// Upload configuration
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;