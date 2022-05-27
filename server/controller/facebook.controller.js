const axios = require("axios");
const config=require("../../config");
const jwt = require("jsonwebtoken");
const appId =config.appId;
const appSecret = config.appSecret;
const SERVER_ROOT_URI = config.SERVER_ROOT_URI;
exports.fbLink = (req, res) => {
  res.send(`
    <html>
      <body>
        <a href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${appId}&r
   edirect_uri=${encodeURIComponent(`${SERVER_ROOT_URI}/oauth-redirect`)}">
          Log In With Facebook
        </a>
      </body>
    </html>
  `);
}

exports.getOauth = async (req, res) => {
  try {
    const authCode = req.query.code;

    const accessTokenUrl = 'https://graph.facebook.com/v6.0/oauth/access_token?' +
      `client_id=${appId}&` +
      `client_secret=${appSecret}&` +
      `redirect_uri=${encodeURIComponent(`/oauth-redirect`)}&` +
      `code=${encodeURIComponent(authCode)}`;

    const accessToken = await axios.get(accessTokenUrl).then(res =>{return res.data.access_token});
    // console.log('Access token is', accessToken);
    accessTokens.add(accessToken);

    res.redirect(`/me?accessToken=${encodeURIComponent(accessToken)}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
};
exports.getToken= async (req, res) => {
  try { 
    const accessToken = req.query.accessToken;
    if (!accessTokens.has(accessToken)) {
      throw new Error(`Invalid access token "${accessToken}"`);
    }
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
exports.loginWithLinkedin = async (req, res, next) => {
    try {
        const { token } = req.body
        const result = await axios
            .post("https://www.linkedin.com/oauth/v2/accessToken", querystring.stringify({
                grant_type: "authorization_code",
                code: token,
                redirect_uri: 'http://localhost:8080/register/linkedin-verif',
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET
            }));
        const accessToken = result.data.access_token;
        const emailRequest = await axios
            .get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=' + accessToken);
        const email = emailRequest.data.elements[0]['handle~'].emailAddress;
        const profile = await axios
            .get('https://api.linkedin.com/v2/me',
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'cache-control': 'no-cache',
                        'X-Restli-Protocol-Version': '2.0.0'
                    }
            });
        
        const jwtToken = signToken(user);
        res.cookie('access_token', jwtToken, {
            httpOnly: true
        });

        res.status(200).json({ jwtToken });
    }
    catch (error)
    {
        res.send({message:error})
    }
}

