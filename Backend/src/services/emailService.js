import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async ({ name, email, subject, message }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: `Hanumant Seva Contact: ${subject}`,
    text: `
New contact message received.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
  });
};
