const axios = require("axios");
const { response } = require("express");
const config = require("../../config");
const {TwitterApi} = require('twitter-api-v2');
const clientID = config.GITHUB_CLIENT_ID;
const clientSecret = config.GITHUB_CLIENT_SECRET;
exports.gitRedirect=(req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}`) 
}
exports.getGithubData = async (req, res) => {
    try {
        const requestToken = req.query.code;
        let access_token;
        axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            access_token = response.data.access_token
            axios({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: 'token ' + access_token
                }
            }).then((response) => {
                    res.send({ data: response.data })
            })
        })
    }
    catch (error)
    {
        res.status(500).send({message:error})
    }
    

}

