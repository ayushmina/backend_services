const config = require("../../config");
const querystring = require('querystring');
const axios = require("axios");
const res = require("express/lib/response");
const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
const SERVER_ROOT_URI = config.SERVER_ROOT_URI;
function getGooleAccessTokens({
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
   return axios.post(url, querystring.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => res.data).catch((error) => {
      throw new Error(error.message);
    });
}
function getGoogleAuthURL() {
    try {
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const options = {
            redirect_uri: `${SERVER_ROOT_URI}/auth/google`,
            client_id: GOOGLE_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' '),
        };
        return `${rootUrl}?${querystring.stringify(options)}`;
    }
    catch (error)
    {
        res.send(error)
    }
}
exports.getGooleAccessTokens = getGooleAccessTokens;
exports.getGoogleAuthURL = getGoogleAuthURL;