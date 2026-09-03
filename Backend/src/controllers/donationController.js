import prisma from "../config/prisma.js";

export const createDonation = async (req, res) => {
  try {
    const {
      amount,
      frequency,
      paymentMethod,
    } = req.body;

    // Basic validation
    if (!amount || amount < 50) {
      return res.status(400).json({
        success: false,
        message: "Minimum donation amount is ₹50",
      });
    }

    if (!frequency) {
      return res.status(400).json({
        success: false,
        message: "Frequency is required",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required",
      });
    }

    // Convert frontend payment method to Prisma enum value
    const paymentMethodMap = {
      upi: "UPI",
      card: "CARD",
      netbanking: "NET_BANKING",
    };

    const selectedPaymentMethod =
      paymentMethodMap[paymentMethod.toLowerCase()];

    if (!selectedPaymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // Get logged-in user's information
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate demo transaction and receipt numbers
    const transactionId =
      "DEMO-" + Date.now() + "-" + Math.floor(Math.random() * 10000);

    const receiptNumber =
      "HS-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    // Create donation
    const donation = await prisma.donation.create({
      data: {
        userId: req.user.userId,
        amount: Number(amount),
        frequency: frequency,
        paymentMethod: selectedPaymentMethod,
        status: "SUCCESS",
        transactionId: transactionId,
        paymentGateway: "DEMO",
        donorName: user.name,
        donorEmail: user.email,
        donorPhone: user.phone,
        receiptNumber: receiptNumber,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Donation created successfully",
      donation: {
        id: donation.id,
        amount: Number(donation.amount),
        frequency: donation.frequency,
        paymentMethod: donation.paymentMethod,
        status: donation.status,
        transactionId: donation.transactionId,
        receiptNumber: donation.receiptNumber,
        donatedAt: donation.donatedAt,
      },
    });
  } catch (error) {
    console.error("Create Donation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create donation",
      error: error.message,
    });
  }
};

