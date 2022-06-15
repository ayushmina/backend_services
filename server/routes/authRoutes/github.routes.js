const express          = require("express")
const router           = express.Router()
const githubController = require("../../controller/authController/github.controoler")
router.get("/", githubController.gitRedirect)
router.get("/github/callback", githubController.getGithubData)

module.exports = router
