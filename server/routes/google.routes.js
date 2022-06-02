const express = require('express');
const router = express.Router();
const googleController = require("../controller/google.controller")
router.route("/google/url").get(googleController.getGoogleAuthUR);
router.route("/google").get(googleController.redirectUriRoutes);
// router.route("/me").get(adminController.GetCurrentUser);
module.exports = router;