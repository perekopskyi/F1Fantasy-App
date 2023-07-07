import * as nodemailer from 'nodemailer';
import { GMAIL } from './config';

// TODO NEED FIX
export const sendEmail = ({ email, code }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL.USER,
      pass: GMAIL.PASSWORD,
    },
  });

  const mailOptions = {
    from: GMAIL.USER,
    to: email,
    subject: 'Recovery code',
    text: `Your recovery code: ${code}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('ERR:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
