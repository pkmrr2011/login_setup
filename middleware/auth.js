const express = require('express');
const app = express();
const i18n = require('i18n');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

i18n.configure({
  locales: ['en'], // Add your supported locales
  directory: __dirname + '/locales',
  cookie: 'locale',
});

app.use(i18n.init); 

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pk518210@gmail.com',
    pass: 'jqjaoefwhppzmhfl',
  },
});


exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      if (token) {
        const decoded = jwt.verify(token, 'project');
        req.user = decoded;
        next(); 
      } else {
        res.status(401).json({ error: 'Invalid token format' });
      }
    } else {
      res.status(401).json({ error: 'Authorization header missing' });
    }
};


exports.sendOtpOnEmail=( data, subject)=> {

  const mailOptions = {
    from: 'pkmrr20@gmail.com',
    to: data.email,
    subject,
    text: `Your Forget Password Otp is ${data.otp}`,
  };
  console.log("mailOptions",mailOptions);

  transporter.sendMail( mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
