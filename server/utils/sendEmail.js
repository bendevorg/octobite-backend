const nodemailer = require('nodemailer');
const logger = require('javascript-custom-logger');

module.exports = (to, subject, html) => {
  return new Promise(async (resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    try {
      await transporter.sendMail({
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
      });
      return resolve();
    } catch (err) {
      logger.error(err);
      return reject(err);
    }
  });
};