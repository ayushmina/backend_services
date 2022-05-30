const express = require('express');
const router = express.Router();
const adminController = require("../controller/google.controller")
router.route("/google/url").get(adminController.getGoogleAuthUR);
router.route("/google").get(adminController.redirectUriRoutes);
// router.route("/me").get(adminController.GetCurrentUser);
module.exports = router;