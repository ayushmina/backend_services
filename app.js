const express = require("express");
const app = express();
const axios = require("axios")
const jwt = require("jsonwebtoken");
const cors =require("cors");
// const env = require("dotenv");
const PORT = process.env.PORT || 8080;
let bodyParser = require("body-parser");
const { google } = require('googleapis');
const querystring = require('querystring');
const cookieParser = require("cookie-parser");
const accessTokens = new Set();
const config=require("./config");
const { stringify } = require("querystring");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const GOOGLE_CLIENT_ID =config.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;
const appId ="1121036925455124";
const appSecret = "3912a21a8b19b58968f4b2a44cbb862d";

const redirectURI = "auth/google"
const SERVER_ROOT_URI="https://authprojectseraphic.herokuapp.com"
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  `https://authprojectseraphic.herokuapp.com/auth/google`,
);
function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: `https://authprojectseraphic.herokuapp.com/auth/google`,
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

// Getting the user from Google with the code
app.get(`/${redirectURI}`, async (req, res) => {
  const code = req.query.code;

  const { id_token, access_token } = await getTokens({
    code,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
  });

  // Fetch the user's profile with the access token and bearer
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
        console.log("this is error" , error)
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
    //  googleUser()
    const token = jwt.sign(googleUser, "rohitkumardddd");
    const userData=jwt.verify(token,"rohitkumardddd")
    console.log("user Data" , userData)

  res.cookie("googleAuth", token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

  res.redirect("http://localhost:3000");
});

// Getting the current user
app.get("/auth/me", (req, res) => {
  console.log("get me");
  try {
    const decoded = jwt.verify(req.cookies[COOKIE_NAME], JWT_SECRET);
    console.log("decoded", decoded);
    return res.send(decoded);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

app.get("/auth/google/url", (req, res) => { res.redirect(getGoogleAuthURL()); });

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <a href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${appId}&r
edirect_uri=${encodeURIComponent('https://authprojectseraphic.herokuapp.com/oauth-redirect')}">
          Log In With Facebook
        </a>
      </body>
    </html>
  `);
});

app.get('/oauth-redirect', async (req, res) => {
  try {
    const authCode = req.query.code;

    const accessTokenUrl = 'https://graph.facebook.com/v6.0/oauth/access_token?' +
      `client_id=${appId}&` +
      `client_secret=${appSecret}&` +
      `redirect_uri=${encodeURIComponent('https://authprojectseraphic.herokuapp.com/oauth-redirect')}&` +
      `code=${encodeURIComponent(authCode)}`;

    const accessToken = await axios.get(accessTokenUrl).then(res =>{return res.data.access_token});
    console.log('Access token is', accessToken);
    accessTokens.add(accessToken);

    res.redirect(`/me?accessToken=${encodeURIComponent(accessToken)}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
});
app.get('/me', async (req, res) => {
  try { 
    const accessToken = req.query.accessToken;
    if (!accessTokens.has(accessToken)) {
      throw new Error(`Invalid access token "${accessToken}"`);
    }

    // Get the name and user id of the Facebook user associated with the
    // access token.
    let data = await axios.get(`https://graph.facebook.com/me?access_token=${encodeURIComponent(accessToken)}`).
      then(res => {return res});
      console.log(data)
      // data=JSON.stringify(data)
    return res.send(`
      <html>
        <body>Your name is ${data.data}</body>
      </html>
    `);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});