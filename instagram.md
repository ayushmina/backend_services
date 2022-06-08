# Getting Started with Create React App

# What are we building?
 Google OAuth integration for NodeJS


# Goals
we will integrate the Instagram basic display API on a Node.js GraphQL API.
Without Passport

# Prerequisites
To follow along in this article, it is necessary to have:

- Node.js installed on your computer.
- Working knowledge of GraphQL.
- Working knowledge of JavaScript
- Facebook developer account


# Adding an Instagram test user
- To use the Instagram basic display API in development, we will have to add a test user. To do so, we will follow the following steps:

- In the left sidebar, click on Roles and then Roles.

- Scroll to the bottom, and hit the Add Instagram Testers button.

- In the resulting pop-up, enter the username of the Instagram account you are going to use throughout the article. Make sure it’s an -  Instagram account you can log in to because you will be required to accept the request sent.

- On hitting Submit, the account will appear in the section with a Pending text attached to it. The owner of the Instagram account is supposed to accept it first to be complete.

- Log in to that particular Instagram account you have entered its username.

- In the settings section, find Apps and Websites. In the resulting section, click on the TESTER INVITES tab. Your recently created app should be listed there as follows:

- tester-invites

- Click on the Accept button.

- Hurray!!, your Instagram app is now configured, it’s time to set up our project.
# necessary Getting the authorization code
- For us to use the API, the first step is to get the authorization code. It provides an authentication mechanism to the Instagram API.

```sh
  "instagramKey":{
     "CLIENTID":"4xxxxxxxxxxx4",
     "client_secret":"b7xxxxxxxxxbe3"
   }
```

 
 If you go to https://developers.google.com/oauthplayground/ you can run through the steps online to see what the various URLs and responses look like
