const express      = require('express');
const router       = express.Router();
const customAuth     = require("../controller/customAuth.controller")

router.post('/user/signin', customAuth.signinUser);
router.post('/user/signup', customAuth.signup);
router.post('/user/forgotPassword', customAuth.forgotPassword);
router.post('/user/resetPassword', customAuth.resetPassword);


module.exports = router;