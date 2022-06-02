// const config=require("../../config");
const axios = require("axios")
const jwt = require("jsonwebtoken");
const { google } = require('googleapis');
const googleService = require("../services/google.service")
const universalFunctions= require("../utils/unversalFunction")
const models = require("../models")
const appConstants = require("../utils/appConstants")
const responseMessages=require("../resources/resources.json");
const config =require("config");
const googleKey=config.get("googleKey")

const GOOGLE_CLIENT_ID =googleKey.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = googleKey.GOOGLE_CLIENT_SECRET;
const redirectURI = googleKey.redirectURI;
const SERVER_ROOT_URI = config.get("SERVER_ROOT_URI");
 new google.auth.OAuth2(
   GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET,
   `${SERVER_ROOT_URI}/${redirectURI}`,
);
console.log( `${SERVER_ROOT_URI}/${redirectURI}`)
module.exports = {
  getGoogleAuthUR: async (req, res) => {
    return res.redirect(googleService.getGoogleAuthURL());
  },
  redirectUriRoutes: async (req, res) => {
    try {
      const code = req.query.code;
      if (!code) {
        res.send({ message: responseMessages.CODE_NOT_FOUND })
      }
      const { id_token, access_token } = await googleService.getGooleAccessTokens({
        code, clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET,
        redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
      });
      const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
      ).then((res) => res.data).catch((error) => {
        throw new Error(error.message);
      });
      const token = jwt.sign(googleUser, config.jwtConfig);
      const userData = jwt.verify(token, config.jwtConfig)
      console.log("userData",userData);
      let isExits = await models.userSchema.findOne({ email: userData.email })
      let payload = {
        userId: userData.id,
        userName: userData.name,
        email: userData.email,
        profilePic: userData.picture,
        loginType:appConstants.googleLoginIn,
      }
      if (!isExits) {
        await models.userSchema.create(payload)
      }
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.SUCCESS,
        },
        res
      );
    }
    catch (error) {
      return universalFunctions.sendError(error, res)
    } 
  }
}