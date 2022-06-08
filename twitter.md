# TWITTER OAUTH LOGIN WITH NODE.JS 


# Goals
TWITTER OAUTH LOGIN WITH NODE.JS

# Requirements
- To have a fully working HTTP server working together with Twitter OAuth in Node.js you need
an application created on developer.twitter.com to be used to sign in with Twitter
- a Consumer API key and secret for the OAuth part
- an HTTP server
- some lightweight Node.js modules

# Dependencies
 Using express as an example here, though you can use any other framework, the concept is the same.

 We need 4 useful modules from npm:
- oauth for generating the request and access tokens for the OAuth flow, and for authenticating to any OAuth enable HTTP API (like Twitter)
- express as the web server
- express-session , cookie-parser for handling the user sessions and cookies

# The HTTP server and endpoints
The local HTTP server will listen on the port 3000 and serves the following routes:

- GET / as the simplest possible authentication HTML page
- GET /twitter/authenticate and /twitter/authorize for the OAuth flow initiation
- GET /twitter/callback to get the authorized user access token and secret

# Step-by-step
- We need to create an OAuth Consumer to generate the request, access token and make authorised requests to the Twitter API:
```sh
const oauthConsumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token', 
  'https://twitter.com/oauth/access_token',
  TWITTER_CONSUMER_API_KEY,
  TWITTER_CONSUMER_API_SECRET_KEY,
  '1.0A',
  'http://127.0.0.1:8080/auth/twitter/twitterCallback', 'HMAC-SHA1')
  ```

- Set up routes for /twitter/logout, /twitter/authorize and /twitter/authenticate:

```sh

  app.get('/twitter/authenticate', twitter('authenticate'))
  app.get('/twitter/authorize', twitter('authorize'))

  function twitter (method = 'authorize') {
    return async (req, res) => {
      const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()
      const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
      res.redirect(authorizationUrl)
    }
  }

```
# Finally the last route, namely /twitter/callback, which completes the OAuth flow!:

```sh

  function twittercallback async (req, res) => {
    const { oauthRequestToken, oauthRequestTokenSecret } = req.session
    const { oauth_verifier: oauthVerifier } = req.query
    const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
    req.session.oauthAccessToken = oauthAccessToken

    const { user_id: userId /*, screen_name */ } = results
    const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })

    req.session.twitter_screen_name = user.screen_name
    res.cookie('twitter_screen_name', user.screen_name, { maxAge: 900000, httpOnly: true })

   
    req.session.save(() => res.redirect('/'))
  }

```

# The remaining methods are used to interact with the Twitter OAuth API:
```sh

async function oauthGetUserById (userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) {
  return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
    .then(body => JSON.parse(body))
}
async function getOAuthAccessTokenWith ({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
      return error
        ? reject(new Error('Error getting OAuth access token'))
        : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
    })
  }

async function getOAuthRequestToken () {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthRequestToken(function (error, oauthRequestToken, oauthRequestTokenSecret, results) {
      return error
        ? reject(new Error('Error getting OAuth request token'))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
    })
  }

```

To get a long-lived access token, we will follow the following steps:
 If you go to https://developer.twitter.com/en/docs/authentication/oauth-2-0 you can run through the steps online to see what the various URLs and responses look like


 # articel url:-

https://cri.dev/posts/2020-03-05-Twitter-OAuth-Login-by-example-with-Node.js/#:~:text=GET%20%2F%20as%20the%20simplest%20possible,log%20out%20from%20the%20application