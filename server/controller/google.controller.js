const config=require("../../config");
const axios = require("axios")
const jwt = require("jsonwebtoken");
const cors =require("cors");
const { google } = require('googleapis');
const querystring = require('querystring');
const GOOGLE_CLIENT_ID =config.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;
const redirectURI = config.redirectURI;
const SERVER_ROOT_URI = config.SERVER_ROOT_URI;
const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${SERVER_ROOT_URI}/auth/google`,
);

function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: `${SERVER_ROOT_URI}/auth/google`,
        client_id: GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;

}
function getTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}) {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

module.exports = {
  getGoogleAuthUR: async (req, res) => {
   return res.redirect(getGoogleAuthURL());
  },
  redirectUriRoutes: async (req, res) => {
    const code = req.query.code;

  const { id_token, access_token } = await getTokens({
    code,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
  });

  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
      .then((res) =>  res.data).catch((error) => {
        // console.log("this is error" , error)
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
    const token = jwt.sign(googleUser,config.jwtConfig);
    const userData=jwt.verify(token,config.jwtConfig)
    // console.log("user Data" , userData)

  res.cookie("googleAuth", token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

  res.redirect("http://localhost:3000");
  },
  GetCurrentUser: async (req, res) => {
    console.log("get me");
    try {
      const decoded = jwt.verify(req.cookies[COOKIE_NAME], JWT_SECRET);
      console.log("decoded", decoded);
      return res.send(decoded);
    } catch (err) {
      console.log(err);
      res.send(null);
    }
  },
}