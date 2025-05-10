import fs from 'fs/promises';
import path from 'path';
import { TEMP_FOLDER } from '../constants/uploads.js';

const deleteFromTemp = async (file) => {
  const tempPath = path.join(TEMP_FOLDER, file.filename);
  await fs.unlink(tempPath);
};

export default deleteFromTemp;
