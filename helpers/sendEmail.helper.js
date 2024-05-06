const nodemailer = require('nodemailer');

module.exports.sendEmail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'namdp.28tech@gmail.com',
      pass: 'keue atjl yzsj dzki'
    }
  });

  const mailOptions = {
    from: 'namdp.28tech@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}