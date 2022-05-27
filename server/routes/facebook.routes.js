const express = require('express');
const router = express.Router();
const facebook = require("../controller/facebook.controller")
router.get('/', facebook.fbLink);
router.get('/oauth-redirect', facebook.getOauth);
router.get('/me', facebook.getToken);
router.get('/loginWithLinkedin', facebook.loginWithLinkedin);


module.exports = router;