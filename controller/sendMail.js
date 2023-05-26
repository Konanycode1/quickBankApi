let nodeMailer = require('nodemailer');
let user

exports.sendMail = (email,req) =>{



    let transport = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8a29b0661901a6",
          pass: "b50dd3fe3834d1"
        }
      });
      let message = {
        from: "abrahamkonany@gmail.com",
        to: req.body.email,
        subject: "Subject",
        text: "Hello SMTP Email"
   }

}