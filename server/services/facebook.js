const axios = require("axios");
const config=require("../../config");
const appId = config.appId;
const appSecret = config.appSecret;
const SERVER_ROOT_URI = config.SERVER_ROOT_URI;
function generateAccessToken(authCode) {
  return new Promise(async (resolve, reject) => {
      try {
    const accessTokenUrl = 'https://graph.facebook.com/v6.0/oauth/access_token?' +
      `client_id=${appId}&` +
      `client_secret=${appSecret}&` +
      `redirect_uri=${encodeURIComponent(`/auth/facebook/oauth-redirect`)}&` +
      `code=${encodeURIComponent(authCode)}`;
    const accessToken = await axios.get(accessTokenUrl).then(res =>{return res.data.access_token});
    accessTokens.add(accessToken);
    res.redirect(`/me?accessToken=${encodeURIComponent(accessToken)}`);
    } catch (error) {
      reject(error);
    }
  })
}
exports.generateAccessToken=generateAccessToken;

