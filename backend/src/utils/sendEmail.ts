import nodemailer from "nodemailer";

interface EmailOptions {
  subject: string;
  message: string;
  send_to: string;
  send_from: string;
  reply_to: string;
}
interface SendEmail {
  (emailOptions: EmailOptions): Promise<void>;
}

const sendEmail: SendEmail = async (EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const options = {
    from: EmailOptions.send_from,
    to: EmailOptions.send_to,
    replyTo: EmailOptions.reply_to,
    subject: EmailOptions.subject,
    html: EmailOptions.message,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmail;
