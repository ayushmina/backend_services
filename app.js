const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { facebookRoutes, googleRoutes, githubRoutes, instagramRoutes } = require("./server/routes");
const url = "mongodb+srv://ayushmeena:ayushmeena@cluster0.h8xj46a.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
  console.log("connection error", error)
});
  
app.use("/auth/facebook", facebookRoutes);
app.use("/auth", googleRoutes);
app.use("/auth/github", githubRoutes);
app.use("/auth/instagram",instagramRoutes)


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});