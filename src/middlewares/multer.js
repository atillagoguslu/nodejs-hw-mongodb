import multer from 'multer';
import { TEMP_FOLDER } from '../constants/uploads.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_FOLDER);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
