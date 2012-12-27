var nodemailer = require('nodemailer');
var jade = require('jade');
var fs = require('fs');
var path = require('path');
var env = require('../config/environment')

var transport = nodemailer.createTransport("SMTP", env.settings.emailSettings.nodemailerTransportOptions);

exports.send = function(templateName, emailData, callback) {
  var templatePath = path.join(__dirname, '..', 'views', 'emails', templateName);
  fs.readFile(templatePath, function (err, data) {
    if (! err) {
      var mailTemplate = jade.compile(data);
      var mailContent = mailTemplate(emailData);
      var mailOptions = {
        from: env.settings.emailSettings.from,
        to: emailData.email,
        subject: emailData.subject,
        html: mailContent,
        generateTextFromHTML: true
      };
      transport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
      });
      if (callback !== undefined) {
        callback(null, 'success');
      }
    }
    else {
      console.log(err);
      if (callback !== undefined) {
        callback(err);
      }
    }
  });
}