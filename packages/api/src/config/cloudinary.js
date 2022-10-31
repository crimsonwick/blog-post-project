import dotenv from 'dotenv'
import Path from 'path'
dotenv.config()
const cloudinary = require('cloudinary').v2

const fs = require('fs')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
})

export const uploadToCloudinary = async (locaFilePath) => {
  const mainFolderName = 'main'
  const filePathOnCloudinary =
    mainFolderName + '/' + Path.parse(locaFilePath).name
  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary, overwrite: false })
    .then((result) => {
      fs.unlinkSync(locaFilePath)

      return {
        message: 'Success',
        url: result.url,
      }
    })
    .catch((error) => {
      fs.unlinkSync(locaFilePath)
      console.log(error)
      return { message: 'Fail' }
    })
}
