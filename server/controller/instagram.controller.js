const express = require('express');
const axios = require("axios")
const {stringify}= require('qs');
const CLIENTID="400001152024284";
const YOUR_REDIRECT_URI="https://authprojectseraphic.herokuapp.com/auth/instagram/instagram";
const client_secret="b7ea1a9d0b7b72041220a97735080be3";
var httpRequest = require('request');
module.exports = {
    getInstagramAuthURL: async (req, res) => {
   var url =`https://api.instagram.com/oauth/authorize?client_id=`+CLIENTID+`&redirect_uri=`+YOUR_REDIRECT_URI+`&scope=user_profile,user_media&response_type=code`
        res.redirect(url);
    },
    redirectUriRoutes: async (req, res) => {
        try {
            var options = {
                url: 'https://api.instagram.com/oauth/access_token',
                method: 'POST',
                form: {
                    client_id: CLIENTID,
                    client_secret: client_secret,
                    grant_type: 'authorization_code',
                    redirect_uri: YOUR_REDIRECT_URI,
                    code: req.query.code
                }
            };
            httpRequest(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var user = JSON.parse(body);
                    res.send({ data: user })
                } else {
                    console.log(error, "error");
                    res.send({ error: error })
                }
            });
        }
        catch (error)
        {
            res.send(error)
        }
    },
  }