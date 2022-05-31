const axios = require("axios");
const config=require("../../config");
const jwt = require("jsonwebtoken");
const facebookServices=require("../services/facebook")
const appId =config.appId;
const appSecret = config.appSecret;
const SERVER_ROOT_URI = config.SERVER_ROOT_URI;
const accessTokens = new Set();
exports.fbLink = (req, res) => {
  res.send(`
    <html>
      <body>
      <div>
      <span>
        <a href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(`${SERVER_ROOT_URI}/auth/facebook/oauth-redirect`)}"> Log In With Facebook
        </a>
        </span>
        </div>
      </body>
    </html>
  `);
}

exports.getOauth = async (req, res) => {
  try {
    const authCode = req.query.code;
    if (!authCode)
    {
      res.send({messge:"authCode Is Not Found"})
    }
    const accessTokenUrl=  facebookServices.generateAccessToken(authCode)
  //     const accessTokenUrl = 'https://graph.facebook.com/v6.0/oauth/access_token?' +
  //       `client_id=${appId}&` +
  //       `client_secret=${appSecret}&` +
  //       `redirect_uri=${encodeURIComponent(`/oauth-redirect`)}&` +
  //       `code=${encodeURIComponent(authCode)}`;
  console.log("accessTokenUrl",accessTokenUrl)
      const accessToken = await axios.get(accessTokenUrl).then(res =>{return res.data.access_token});
      accessTokens.add(accessToken);
      console.log(accessToken,"accessToken");
      res.redirect(`/auth/facebook/me?accessToken=${encodeURIComponent(accessToken)}`);
  //   } catch (err) {
  //      console.log(err);
  //      return res.status(500).json({ message: err.response.data || err.message });
  }
  catch (error)
  {
      res.send({error})
  }

},
exports.getToken= async (req, res) => {
  try { 
    const accessToken = req.query.accessToken;
    // if (!accessTokens.has(accessToken)) {
    //   throw new Error(`Invalid access token "${accessToken}"`);
    // }
    let data = await axios.get(`https://graph.facebook.com/me?access_token=${encodeURIComponent(accessToken)}`).
      then(res => {return res});
      console.log(data)
    return res.send(`
      <html>
        <body>Your name is ${data.data}</body>
      </html>
    `);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
}
