import multer from "multer";
import { ROOT_DIRECTORY } from "../config.js";

// define storage to save uploaded file
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const storagePath = `${ROOT_DIRECTORY}/public/userImage/`;
    callback(null, storagePath);
  },
  filename: (req, file, callback) => {
    const fileName = `${Math.random()}-${file.originalname}`;
    callback(null, fileName);
  },
});

// define function to filtering file
const filterFile = (req, file, callback) => {
  const allowedFile = /png|jpg|jpeg/;
  const isAllow = allowedFile.test(file.mimetype);

  if (isAllow) {
    callback(null, true);
  } else {
    callback(new Error("your file is not allow to upload"));
  }
};

const uploadUserImage = multer({
  storage,
  fileFilter: filterFile,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export { uploadUserImage };
