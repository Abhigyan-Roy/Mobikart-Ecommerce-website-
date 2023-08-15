const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: 'abhigyan.roy.cse24@heritageit.edu.in',
    pass: 'hWvB9QDd',
  },
});

exports.newSign = (user) => {
  const htmlTemplatePath = path.join(__dirname, '../views/mailers/SignUpmail.ejs');

  ejs.renderFile(htmlTemplatePath, { user }, (err, htmlString) => {
    if (err) {
      console.log('Error rendering EJS template', err);
      return;
    }

    const mailOptions = {
      from: 'abhigyan.roy.cse24@heritageit.edu.in',
      to: user.email,
      subject: 'New Account Created!',
      html: htmlString,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Error in sending mail', err);
        return;
      }
      console.log('Mail sent:', info.response);
    });
  });
};
