import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

export const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const whitelist = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!whitelist.includes(file.mimetype)) {
      return cb('file is not allowed');
    }

    cb(null, true);
  },
});
