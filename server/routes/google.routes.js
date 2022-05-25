const express = require('express');
const router = express.Router();
const adminController = require("../controller/google.controller")
app.get("/auth/google/url", (req, res) => { return res.send(getGoogleAuthURL()); });
