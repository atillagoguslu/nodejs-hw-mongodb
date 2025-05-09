import fs from 'fs/promises';
import path from 'node:path';
import { TEMP_FOLDER, UPLOAD_FOLDER } from '../constants/uploads.js';

const moveUploadFromTemp = async (file) => {
  await fs.rename(path.join(TEMP_FOLDER, file.filename), path.join(UPLOAD_FOLDER, file.filename));
  return `${process.env.FRONTEND_URL}/uploads/${file.filename}`;
};

export default moveUploadFromTemp;
