const express = require('express');
const router = express.Router();
const githubController = require("../controller/github.controoler")
router.get('/',githubController.gitRedirect)
router.get('/github/callback', githubController.getGithubData)
// router.get('/success',githubController.gitSuccess)


module.exports = router;