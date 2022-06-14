const cloudinary = require("cloudinary")
const config = require("config")
require("dotenv").config();
let cloudinaryConfig = config.get("cloudinaryConfig")
console.log(cloudinaryConfig)
cloudinary.config({
  cloud_name: cloudinaryConfig.CLOUD_NAME,
  api_key: cloudinaryConfig.API_KEY,
  api_secret: cloudinaryConfig.API_SECRET,
})

// exports.uploads = (file, folder) => {
//   try {
//     console.log(file, "file")
//     cloudinary.v2.uploader.upload((file), (result) => {
//       console.log(result)
//         return result;
      
//     })
//   } catch (err) {
//     console.log(err, "error is here ")
//     throw err
//   }
// }
exports.uploads = (file, folder) => {
    return new Promise(resolve => {
      cloudinary.uploader.upload(file, (result) => {
          
        resolve({
          url: result.url,
          id: result.public_id
        })
      }, {
        resource_type: "auto" ,
        folder: folder
      })
    })
  }
