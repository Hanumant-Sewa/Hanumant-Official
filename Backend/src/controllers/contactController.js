import prisma from "../config/prisma.js";
import { sendContactEmail } from "../services/emailService.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Save contact message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    // Send email notification
    try {
      await sendContactEmail({
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject,
        message: contactMessage.message,
      });
    } catch (emailError) {
      // Database message is already saved,
      // so don't fail the contact submission if email fails.
      console.error("Email sending failed:", emailError);
    }

    return res.status(201).json({
      message: "Your message has been sent successfully.",
      contactMessage: {
        id: contactMessage.id,
      },
    });
  } catch (error) {
    console.error("Contact message error:", error);

    return res.status(500).json({
      message: "Failed to send message. Please try again later.",
    });
  }
};
