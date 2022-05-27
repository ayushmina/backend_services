const express = require('express');
const router = express.Router();
const instagramController = require("../controller/instagram.controller")
router.route("/instagram/url").get(instagramController.getInstagramAuthURL);
router.route("/instagram").get(instagramController.redirectUriRoutes);
// router.route("/GetCurrentUser").get(instagramController.GetCurrentUser);


module.exports = router;