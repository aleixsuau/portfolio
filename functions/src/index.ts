// firebase deploy --only functions
// firebase functions:config:get

import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
// Typings error with 'import *...'
const cors_express = require('cors-express');

const cors = cors_express({
  origin: true,
});

export const contactEmail = functions.https.onRequest((req, res) => {
  if (req.method === 'OPTIONS') { return cors(req, res, () => res.status(200).send())};

  if (req.body.email && req.body.message) {
    return _sendEmail('info@macrofonoestudio.es', `Aleix Portfolio >> message from: ${req.body.email}`, req.body.message)
              .then(() => cors(req, res, () => res.status(200).send()))
              .catch((err) => cors(req, res, () => res.status(500).send(err)));
  } else {
    return cors(req, res, () => res.status(500).send(`Email send failed :(`));
  }
});

function _sendEmail(recipient: string, subject: string, text: string) {
  const mailTransport = nodemailer.createTransport({
      host: functions.config().smtp.host,
      port: 465,
      secure: true,
      auth: {
          user: functions.config().smtp.username,
          pass: functions.config().smtp.password,
      },
  });

  const mailOptions = {
      from: functions.config().smtp.username,
      to: recipient,
      subject: subject,
      text: text
  }

  return mailTransport
          .sendMail(mailOptions)
          .then((result: any) => {
              console.log('Email sent to:', recipient);
              return result;
          });
}
