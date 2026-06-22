// import multer from 'multer';
// import { MESSAGES } from '../Utils/status.codes.messages.js';

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error(MESSAGES.VALIDATION_ERROR + ': Only image and video files are allowed!'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
    
//       fileSize: 100 * 1024 * 1024, // For media files (50MB)
//     fieldSize: 10 * 1024 * 1024 // ✅ Add this line: For text fields (e.g., content), set to 10MB to be safe
//   },
// });

// export default upload;


import multer from "multer";
import { MESSAGES } from "../Utils/status.codes.messages.js";

// ✅ Use memory storage (you can switch to disk storage if needed)
const storage = multer.memoryStorage();

// ✅ File filter — allow safe file types (media + documents)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/", // all images
    "video/", // all videos
    "application/pdf", // pdf
    "application/msword", // doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
    "application/vnd.ms-excel", // xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
    "text/plain" // txt
  ];

  // Check MIME type
  if (allowedTypes.some(type => file.mimetype.startsWith(type) || file.mimetype === type)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        MESSAGES.VALIDATION_ERROR + ": Invalid file type! Only media or document files are allowed."
      ),
      false
    );
  }
};

// ✅ Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
    fieldSize: 10 * 1024 * 1024 // 10MB for text fields (safe limit)
  }
});

export default upload;
