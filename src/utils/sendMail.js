import nodemailer from 'nodemailer';

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER,
    port: process.env.BREVO_SMTP_PORT,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_API_KEY,
    },
  });

  try {
    await transporter.verify();
    console.log('SMTP connection successful');
  } catch (error) {
    console.log('SMTP connection failed:', error);
    throw new Error('SMTP connection failed');
  }

  return transporter.sendMail(options);
};

export default sendMail;
