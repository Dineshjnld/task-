// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Set your desired port

app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dineshjnld00@gmail.com',
    pass: 'foeqneosuegvnpyw'
}
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'dineshjnld00@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
