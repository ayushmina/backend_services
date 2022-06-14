const express          = require('express');
const router           = express.Router();
const upload = require("../controller/Upload/multer")
const multerImage = require('../services/multer_only_image');
const cloudinary  = require("../controller/Upload/cloudinaryUpload");
router.route("/fileUpload").post(upload.Upload);
router.route("/cloudinaryUpload").post(multerImage.array('image') ,cloudinary.upload_ON_Cloudinary);



module.exports = router;