import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function _sendEmail(recipient: string, subject: string, text: string) {
  console.log('Sending Email to:', recipient, subject, text);

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
            .then((result) => {
                console.log('Email sent to:', recipient);
                return result;
            });
}
