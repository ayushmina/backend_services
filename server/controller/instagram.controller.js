const express = require('express');
const axios = require("axios")
const {stringify}= require('qs');
const CLIENTID="400001152024284";
const YOUR_REDIRECT_URI="https://authprojectseraphic.herokuapp.com/auth/instagram/instagram";
const client_secret="b7ea1a9d0b7b72041220a97735080be3";
var httpRequest = require('request');
let getUserInfo= require("./../services/instragram");
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
            httpRequest(options,  async (error, response, body)=> {
                if (!error && response.statusCode == 200) {
                    var user = JSON.parse(body);
                    console.log(user,"user inside redirectUriRoutes ")
                    // res.send({ data: user })

                    let userInfo= await getUserInfo.getUserInfo(user.access_token);
                    console.log(userInfo)
                } else {
                    console.log(error, " response.statusCode != 200 not found error");
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

//   try{
//     let   response1 = await axios.get("https://graph.instagram.com/me", {
//           params: {
//             fields: "id,username,media_count,account_type",
//             access_token: "IGQVJYUHlpRG1CT0JDbUdHbV9sMjFMQWNYMjNNYXc1UnByZA0Q0dTgyTHNyOXAyemREQlhSUk5RelVXcWtpN240MnoydzlTc1d2R2dQdXYwTDZA1cVFfb1pKZADNFM3FZARk5LQkdfYmZAFM2V2T090SEFNMjZAqVGpiVzgzTXBV",
//           },
//           headers: {
//             host: "graph.instagram.com",
//           },
//         });
//     let   response = await axios.get("https://graph.instagram.com/me/media", {
//           params: {
//             fields:
//               "id,caption,media_url,media_type,permalink,thumbnail_url,timestamp,username",
//             access_token: "IGQVJYUHlpRG1CT0JDbUdHbV9sMjFMQWNYMjNNYXc1UnByZA0Q0dTgyTHNyOXAyemREQlhSUk5RelVXcWtpN240MnoydzlTc1d2R2dQdXYwTDZA1cVFfb1pKZADNFM3FZARk5LQkdfYmZAFM2V2T090SEFNMjZAqVGpiVzgzTXBV",
//           },
//           headers: {
//             host: "graph.instagram.com",
//           },
//         });
//         console.log(response.data,response1)
//       }catch(err){
//           console.log(err);
//       }