/*
 * Simple Contact Form Mailer
 * Author: Jono Nelson
 * References: https://github.com/killshot13/express-smtp-mailer
 *             https://github.com/victoria-lo/Nodemailer-Tutorial
 */

// Dependencies
const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require('express-rate-limit');
require("dotenv").config();

// Consts
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;
const limiter = new rateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});
  

/*======== Instantiate the express app ========*/
const app = express();
// Serve the static stuff
app.use("/", express.static(process.cwd() + "/static"));
// Configure the body parser for requests (only accept JSON)
app.use(express.json());

// Create transport
let transport;
if(!isDev) {
  transport = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };
} else {
  transport = {
    host: "smtp.ethereal.email",
    port: 587,
    //create a Ethereal test account @https://ethereal.email/create
    auth: {
      user: process.env.SMTP_DEV_EMAIL,
      pass: process.env.SMTP_DEV_PASSWORD,
    },
  };
}

const transporter = nodemailer.createTransport(transport)
// Verify connection configuration
transporter.verify(function (error, success) {
  if (error)
    console.log(error);
  else
    console.log("Server is ready to send mail!");
});

app.post("/contact", (req, res) => {
  // Create mailable object from request JSON
  const mail = {
    sender: `${req.body.name} <${req.body.email}>`,
    to: transport.auth.user,
    subject: "Portfolio Site Contact!!",
    text: `From: ${req.body.name} <${req.body.email}> \n\n${req.body.message}`,
  };

  //send mail to recepient
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      if(res)
        res.status(500).send({ error: err });
    } else {
      if(res)
        res.status(200).send({ status: "Email successfully sent!" });
    }
  });
});

// The only route (index.html)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/static/index.html");
});

/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
