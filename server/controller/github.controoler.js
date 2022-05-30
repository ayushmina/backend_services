const axios = require("axios");
const { response } = require("express");
const config = require("../../config");
const models = require("../models")
const appConstants = require("../utils/appConstants")
const responseMessages=require("../resources/resources.json")
const clientID = config.GITHUB_CLIENT_ID;
const clientSecret = config.GITHUB_CLIENT_SECRET;
const  universalFunctions =require("../utils/unversalFunction");
exports.gitRedirect=(req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}`) 
}
exports.getGithubData = async (req, res) => {
    try {
        const requestToken = req.query.code;
        let access_token;
        let userData,payload,isExits;
        axios({method: 'post', url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
            headers: { accept: 'application/json'}
        }).then((response) => {
            access_token = response.data.access_token
            axios({method: 'get',url: `https://api.github.com/user`,
            headers: { Authorization: 'token ' + access_token}
            }).then(async(response) => {
                if (response && response.data)
                    userData = response.data;
                    payload = {
                    userId: userData.id,
                    userName: userData.login,
                    email: userData.email,
                    profilePic: userData.picture,
                    loginType:appConstants.githubLogIn,
                    }
                 isExits = await models.userSchema.findOne({ userId: userData.id })
                if (!isExits) {
                    await models.userSchema.create(payload)
                }
            return universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message:responseMessages.SUCCESS,
                data:response.data,
            },res);
          })
        })
    }
    catch (error)
    {
      return universalFunctions.sendError(error, res)
    }
}

