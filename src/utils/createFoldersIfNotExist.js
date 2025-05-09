import fs from 'fs/promises';

const createFoldersIfNotExist = async (path) => {
  try {
    const exists = await fs.access(path);
    console.log('Folder exists: ', exists, 'at path: ', path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path, { recursive: true });
      console.log('Folder created:', path);
    } else {
      console.log('Error creating folders:', error);
      throw new Error('Error creating folders:', error.message);
    }
  }
};

export default createFoldersIfNotExist;
