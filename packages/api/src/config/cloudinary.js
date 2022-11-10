import dotenv from 'dotenv';
import Path from 'path';
dotenv.config();
const cloudinary = require('cloudinary').v2;

const fs = require('fs');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});
export const uploadToCloudinary = async (locaFilePath) => {
  try {
    const mainFolderName = 'main';
    const filePathOnCloudinary =
      mainFolderName + '/' + Path.parse(locaFilePath).name;

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        locaFilePath,
        {
          overwrite: false,
          responsive_breakpoints: [
            {
              create_derived: false,
              bytes_step: 20000,
              min_width: 200,
              max_width: 1000,
              max_images: 20,
            },
          ],
          public_id: filePathOnCloudinary,
        },
        (err, url) => {
          console.log(url);
          fs.unlinkSync(locaFilePath);
          return resolve(url);
        }
      );
    });
  } catch (err) {
    fs.unlinkSync(locaFilePath);
    console.log(err);
    return { message: 'Fail' };
  }
};

export const uploadDp = async (locaFilePath) => {
  try {
    const mainFolderName = 'main';
    const filePathOnCloudinary =
      mainFolderName + '/uploads/' + Path.parse(locaFilePath).name;

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        locaFilePath,
        {
          overwrite: false,
          public_id: filePathOnCloudinary,
        },
        (err, url) => {
          console.log(url);
          fs.unlinkSync(locaFilePath);
          return resolve(url);
        }
      );
    });
  } catch (err) {
    fs.unlinkSync(locaFilePath);
    console.log(err);
    return { message: 'Fail' };
  }
};
