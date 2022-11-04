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
  const mainFolderName = 'main';
  const filePathOnCloudinary =
    mainFolderName + '/' + Path.parse(locaFilePath).name;
  return cloudinary.uploader
    .upload(
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
      (error, result) => {
        console.log(result);
        console.log(
          result.responsive_breakpoints.map((obj) => console.log(obj))
        );
      }
    )
    .then((result) => {
      fs.unlinkSync(locaFilePath);
      return {
        message: 'Success',
        url: result.url,
      };
    })
    .catch((error) => {
      fs.unlinkSync(locaFilePath);
      console.log(error);
      return { message: 'Fail' };
    });
};

export const uploadDp = async (locaFilePath) => {
  const mainFolderName = 'main';
  const filePathOnCloudinary =
    mainFolderName + '/uploads/' + Path.parse(locaFilePath).name;
  return cloudinary.uploader
    .upload(
      locaFilePath,
      {
        overwrite: false,
        public_id: filePathOnCloudinary,
      },
      (error, result) => {
        console.log(result);
      }
    )
    .then((result) => {
      fs.unlinkSync(locaFilePath);
      return {
        message: 'Success',
        url: result.url,
      };
    })
    .catch((error) => {
      fs.unlinkSync(locaFilePath);
      console.log(error);
      return { message: 'Fail' };
    });
};
