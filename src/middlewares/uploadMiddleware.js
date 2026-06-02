import multer from "multer"

const storage = multer.memoryStorage()

export const uploadPostImages = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Solo se permiten imagenes"));
    }

    cb(null, true);
  },
}).array("images", 5)