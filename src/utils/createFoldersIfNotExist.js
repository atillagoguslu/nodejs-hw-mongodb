import fs from 'fs/promises';

const createFoldersIfNotExist = async (path) => {
  try {
    await fs.access(path);
    console.info('Folder exists: at path: ', path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path, { recursive: true });
      console.info('Folder created:', path);
    } else {
      console.error('Error creating folders:', error);
      throw new Error('Error creating folders:', error.message);
    }
  }
};

export default createFoldersIfNotExist;
