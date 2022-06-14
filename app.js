const express       = require("express");
const app           = express();
let bodyParser      = require("body-parser");
const db            = require("./databaseConnect");
const routes        = require("./server/routes");
const PORT          = process.env.PORT || 8080;
const cors          = require('cors');
const path          = require('path');

const uploadRoutes  = require("./server/routes/upload.routes");
 
db.mongoConnect();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', routes)
app.use('/upload', uploadRoutes)



let router = express.Router();
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// const { facebookRoutes, googleRoutes, githubRoutes, instagramRoutes,twitterRoutes,appAuthRoutes,routeArry } = require("./server/routes");
// app.use("/auth/app", appAuthRoutes);
// app.use("/auth/facebook", facebookRoutes);
// app.use("/auth/google", googleRoutes);
// app.use("/auth/github", githubRoutes);
// app.use("/auth/instagram",instagramRoutes)
// app.use("/auth/twitter",twitterRoutes)