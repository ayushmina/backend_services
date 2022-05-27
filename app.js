const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { facebookRoutes ,googleRoutes,githubRoutes,instagramRoutes} = require("./server/routes");
app.use("/facebook", facebookRoutes);
app.use("/auth", googleRoutes);
app.use("/", githubRoutes);
app.use("/auth1",instagramRoutes)



app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});