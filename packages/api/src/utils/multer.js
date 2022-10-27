import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.MULTER_STORAGE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });
