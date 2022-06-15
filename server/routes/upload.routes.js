const express               = require('express');
const router                = express.Router();
const upload                = require("../controller/Upload/multer")
const multerImage           = require('../services/multer_only_image');
const cloudinary            = require("../controller/Upload/cloudinaryUpload");
const s3_controller         = require("../controller/Upload/s3controller");
const multerS3              = require("../services/uploadService/s3Service");  

router.route("/fileUpload").post(upload.Upload);
router.route("/cloudinaryUpload").post(multerImage.array('image') ,cloudinary.upload_ON_Cloudinary);
router.route("/s3/getfiles").get(s3_controller.getListFiles);
router.route("/s3/download").get(s3_controller.downloadfile);
router.route("/s3/delete").delete(s3_controller.deleteFile);
router.route("/s3/uploadfiles").post(multerImage.array('file') ,s3_controller.S3Upload);
// router.route("/s3/uploadfiles").post(multerS3.uploadFile.single("file"),s3_controller.S3Upload);



module.exports = router;