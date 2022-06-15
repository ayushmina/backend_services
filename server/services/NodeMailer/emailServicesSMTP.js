const Config                  = require("config")
const Templates               = require("./emailTemplates")
const Handlebars              =require("handlebars")
let nodemailer                =require("nodemailer")

const nodeMailerConfig=Config.get("nodeMailer_SMTP");

const renderMessageFromTemplateAndVariables = (templateData, variablesData) => {
  return Handlebars.compile(templateData)(variablesData);
};


exports.sendEmail = (emailType, emailVariables, emailId) => {
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
  var mailOptions = {
    from: nodeMailerConfig.user,
    to: emailId,
    subject: null,
    html: null,
  };

  switch (emailType) {


    case "FORGOT_PASSWORD":
      mailOptions.subject = Templates.forgotPasswordDoc.subject;
      mailOptions.html = renderMessageFromTemplateAndVariables(
        Templates.forgotPasswordDoc.html,
        emailVariables
      );
      break;

    case "FEEDBACK":
      mailOptions.subject = Templates.feedback.subject;
      mailOptions.html = renderMessageFromTemplateAndVariables(
        Templates.feedback.html,
        emailVariables
      );
      break;
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (!error) {
      console.log(`Email sent!`, info);

    } else {
      throw error
    }
  })
};
