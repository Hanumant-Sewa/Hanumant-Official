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
export const sendPasswordResetEmail = async (email, name, resetUrl) => {
  try {
    await transporter.sendMail({
      from: `"Hanumant Seva" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Hanumant Seva Password",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          border-radius: 10px;
        ">

          <h2 style="color: #d97706;">
            Hanumant Seva
          </h2>

          <p>Hello ${name},</p>

          <p>
            We received a request to reset your Hanumant Seva
            account password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 22px;
              background: #d97706;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>

          <p style="margin-top: 25px;">
            This link will expire in 15 minutes.
          </p>

          <p>
            If you did not request a password reset, you can
            safely ignore this email.
          </p>

          <p>
            With gratitude,<br />
            <strong>Hanumant Seva Team</strong>
          </p>

        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Password reset email error:", error);
    throw error;
  }
};
