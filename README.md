# Getting Started with Create React App

# What are we building?
 Google OAuth integration for NodeJS

Without Passport
# What will you get as a result of watching?
 Build Google OAuth integration into your own application
 Have a good understanding of OAuth
 Be able to build OAuth integrations for other identity providers, such as GitHub, LinkedIn & Reddit
install axios googleapis 
 version 
"express": "^4.18.1",
"googleapis": "^100.0.0",
"axios": "^0.27.2",
# http://localhost:8080/auth/google/google/url    i

 generateAuthCodeUrl 
 it will redirect to google auth url  from that  you can log or sign in with google 
1 Construct an accounts.google.com URL with 4 query params :-
-  client_id to identify your app
- scope to say what permissions you're asking for
- redirect_uri to tell Google where to redirect the user's browser with the result
- response_type=code to say you want an Auth Code 
2 redirect the user's browser to that URL
3 Have a sip of coffee while the user logs in, chooses his Google account, and grants permission, until eventually ...
4 The user's browser gets redirected back to your app's redirect_uri, with a query param of code which is the one-time Auth Code

# app's redirect_uri

http://localhost:8080/auth/google/google/google 
callback url
router.route("/google").get(googleController.redirectUriRoutes);  

5 Post the Auth Code to Google's token endpoint
6 Parse the JSON response to get the Access Token
```sh

      const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
      ).then((res) => res.data).catch((error) => {
        throw new Error(error.message);
      });
```

7 Use the Access Token in a "authorization: bearer access_token" http header for your subsequent Google API requests
 
 If you go to https://developers.google.com/oauthplayground/ you can run through the steps online to see what the various URLs and responses look like
