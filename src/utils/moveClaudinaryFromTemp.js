import cloudinary from 'cloudinary';
import { conGREEN, conRED } from '../constants/console_colors.js';
import createHttpError from 'http-errors';

const moveClaudinaryFromTemp = async (file) => {
  cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.info('In moveClaudinaryFromTemp: Uploading to Cloudinary');
  const result = await cloudinary.v2.uploader.upload(file.path);
  if (result.secure_url) {
    console.info(conGREEN + 'In moveClaudinaryFromTemp: Uploading to Cloudinary success');
    return result.secure_url;
  } else {
    console.error(conRED + 'In moveClaudinaryFromTemp: Uploading to Cloudinary failed');
    throw createHttpError(500, 'Uploading to Cloudinary failed');
  }
};

export default moveClaudinaryFromTemp;
