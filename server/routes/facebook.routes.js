const express      = require('express');
const router       = express.Router();
const facebook     = require("../controller/facebook.controller")

router.get('/facebookLink', facebook.fbLink);
router.get('/oauth-redirect', facebook.getOauth);
router.get('/me', facebook.getToken);


module.exports = router;