let nodemailer                =require("nodemailer")
let config                    =require("config")


const nodeMailerConfig=config.get("nodeMailer_SMTP");

const sendOTPUsingEmail =async (email,otp) => {
  try {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: nodeMailerConfig.user,
            pass: nodeMailerConfig.pass,
        }
    })
    let bodymessage = `your otp  ${otp}`
    var mailOptions = {
      from: "monu@seraphic.io",
      to: `${email}`,
      subject: `ONE_TIME_PASSOWRD for login nd signup`,
      html: `${bodymessage}`,
    }
     transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log(`Email sent!`, info);

      } else {
        throw error
      }
    })
  } catch (err) {
    throw err
  }
}
exports.sendOTPUsingEmail=sendOTPUsingEmail;
