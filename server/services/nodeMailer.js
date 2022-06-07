let nodemailer                =require("nodemailer")
let config                    =require("config")
var smtpTransport = require('nodemailer-smtp-transport');



let Password=config.get("SupportEmailPassword")
let SupportEmail=config.get("SupportEmail")
const sendOTP = (email,otp) => {
  try {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "ayushmina10@gmail.com",
          clientId: "192073990165-k8uk1edbbhb0lm03lqb7ikvf3ibqotr5.apps.googleusercontent.com",
          clientSecret: "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",
          accessToken:"ya29.a0ARrdaM_TyQmsEhtGTn79eZF8zsLhvHtJt9lO-OFg5qynrmmHYGZ-wAxRRiOJCfhrD_oY-jvdIMZXuvT3TJHwt7SgjQWGEwjGx9WSBgNOZ7JplWPoLsJsrUuSonpJC7bhqU6xcLj8gJu-N6ETYnNSPEKsWgTf"
        }
      });
    let bodymessage = `your otp  ${otp}`
    var mailOptions = {
      from: `test.seraphic15@gmail.com`,
      to: `${email}`,
      subject: `Thank you for contacting Infinite`,
      html: `${bodymessage}`,
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {

        // console.log(info)
      } else {
        //   console.log(error,info)
        throw error
      }
    })
  } catch (err) {
    throw err
  }
}
exports.sendOTP=sendOTP;

