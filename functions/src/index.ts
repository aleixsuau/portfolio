/* eslint-disable require-jsdoc */
/*
* Firebase settings
* firebase functions:config:get
* firebase functions:config:set smtp.username = "AleixSuau"
*
* Firebase deploy
* firebase deploy --only functions
*/


import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const corsExpress = require("cors-express");
const cors = corsExpress({
  origin: true,
});

export const contactEmail = functions.https.onRequest((req, res) => {
  if (req.method === "OPTIONS") {
    return cors(req, res, () => res.status(200).send());
  }

  if (req.body.email && req.body.message) {
    return _sendEmail(
        "info@macrofonoestudio.es",
        `Aleix Portfolio >> message from: ${req.body.email}`,
        req.body.message
    )
        .then(() => cors(req, res, () => res.status(200).send()))
        .catch((err) => cors(req, res, () => res.status(500).send(err)));
  } else {
    return cors(req, res, () => res.status(500).send("Email send failed :("));
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
    text: text,
  };

  return mailTransport
      .sendMail(mailOptions)
      .then((result: unknown) => {
        console.log("Email sent to:", recipient);
        return result;
      });
}
