const GOOGLE_CLIENT_ID =config.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;
const redirectURI = "auth/google"
const SERVER_ROOT_URI="http://localhost:8080"
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  `http://localhost:8080/auth/google`,
);
function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: `http://localhost:8080/auth/google`,
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
