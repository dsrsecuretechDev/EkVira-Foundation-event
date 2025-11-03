import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path, {dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

dotenv.config();

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const { email, subject, template, data } = options;
  console.log(options);
  
  const __dirname = dirname(fileURLToPath(import.meta.url));
  
  // get the path to the email-templates file
  const templatePath = path.join(__dirname, "../mails", template);
  // const templatePath = new URL(`../mails/${template}`, import.meta.url).pathname;
  // Render the email template with EJS.
  const html = await ejs.renderFile(templatePath, data);

  const mailOption = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOption);
};

export default sendMail;
