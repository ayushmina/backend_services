const express = require('express');
const router = express.Router();
const adminController = require("../controller/twitter.controller")
router.route("/authenticate").get(adminController.authenticate);
router.route("/authorize").get(adminController.twitter("authorize"));
router.route("/twitterCallback").get(adminController.twitterCallback);
// router.route("/me").get(adminController.GetCurrentUser);
module.exports = router;