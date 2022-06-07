const express      = require('express');
const router       = express.Router();
const firebaseAuth = require("../controller/firebaseAuth.controller")
router.route("/loginSignUp").get(firebaseAuth.firebaseLoginSignUp);


module.exports = router;