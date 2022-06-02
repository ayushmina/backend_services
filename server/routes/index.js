
// module.exports = {
//     facebookRoutes,
//     googleRoutes,
//     githubRoutes,
//     instagramRoutes,
//     twitterRoutes,
//     appAuthRoutes
// };

// app.use("/auth/app", appAuthRoutes);
// app.use("/auth/facebook", facebookRoutes);
// app.use("/auth/google", googleRoutes);
// app.use("/auth/github", githubRoutes);
// app.use("/auth/instagram",instagramRoutes)
// app.use("/auth/twitter",twitterRoutes)
const express = require('express')
const facebookRoutes = require("./facebook.routes");
const googleRoutes = require("./google.routes");
const githubRoutes = require("./github.routes");
const instagramRoutes = require("./instagram.routes");
const twitterRoutes=require("./twitter.routes");
const appAuthRoutes=require("./appAuth.routes");
const router = express.Router()
const defaultRoutes = [
  {
    path: '/facebook',
    route: facebookRoutes,
  },
  {
    path: '/google',
    route: googleRoutes,
  },
  {
    path: '/github',
    route: githubRoutes,
  },
  {
    path: '/instagram',
    route: instagramRoutes,
  },
  {
    path: '/twitter',
    route: twitterRoutes,
  },
  {
    path: '/app',
    route: appAuthRoutes,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
