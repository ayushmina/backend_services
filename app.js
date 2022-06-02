const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
let bodyParser = require("body-parser");
const db =require("./databaseConnect");
// const { facebookRoutes, googleRoutes, githubRoutes, instagramRoutes,twitterRoutes,appAuthRoutes,routeArry } = require("./server/routes");
const routes = require("./server/routes");

const path = require('path');




db.mongoConnect();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/auth/app", appAuthRoutes);
// app.use("/auth/facebook", facebookRoutes);
// app.use("/auth/google", googleRoutes);
// app.use("/auth/github", githubRoutes);
// app.use("/auth/instagram",instagramRoutes)
// app.use("/auth/twitter",twitterRoutes)
app.use('/auth', routes)

let router = express.Router();
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});