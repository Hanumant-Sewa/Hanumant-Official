import crypto from "crypto";
import prisma from "../config/prisma.js";
import razorpay from "../config/razorpay.js";

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

export const createDonationOrder = async (req, res) => {
  try {
    const { amount, frequency, paymentMethod } = req.body;

    // ------------------------------------------
    // Validate amount
    // ------------------------------------------

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 50) {
      return res.status(400).json({
        success: false,
        message: "Minimum donation amount is ₹50",
      });
    }

    // ------------------------------------------
    // Validate frequency
    // ------------------------------------------

    if (!frequency) {
      return res.status(400).json({
        success: false,
        message: "Frequency is required",
      });
    }

    // ------------------------------------------
    // Validate payment method
    // ------------------------------------------

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required",
      });
    }

    // ------------------------------------------
    // Convert frontend payment method
    // to Prisma enum value
    // ------------------------------------------

    const paymentMethodMap = {
      upi: "UPI",
      card: "CARD",
      netbanking: "NET_BANKING",
    };

    const selectedPaymentMethod = paymentMethodMap[paymentMethod.toLowerCase()];

    if (!selectedPaymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // ------------------------------------------
    // Get logged-in user
    // ------------------------------------------

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },

      select: {
        id: true,
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

    // ------------------------------------------
    // Convert amount to paise
    // Example:
    // ₹100 = 10000 paise
    // ------------------------------------------

    const amountInPaise = Math.round(numericAmount * 100);

    // ------------------------------------------
    // Generate unique receipt number
    // ------------------------------------------

    const receiptNumber =
      "HS-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    // ------------------------------------------
    // Create Razorpay order
    // ------------------------------------------

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptNumber,

      notes: {
        userId: String(user.id),
        frequency: frequency,
        paymentMethod: selectedPaymentMethod,
      },
    });

    // ------------------------------------------
    // Save donation in database as PENDING
    // ------------------------------------------

    const donation = await prisma.donation.create({
      data: {
        userId: user.id,

        amount: numericAmount,

        frequency: frequency,

        currency: "INR",

        paymentMethod: selectedPaymentMethod,

        // Payment is not successful yet
        status: "PENDING",

        // Razorpay order ID
        orderId: razorpayOrder.id,

        paymentGateway: "RAZORPAY",

        // Save donor information
        donorName: user.name,
        donorEmail: user.email,
        donorPhone: user.phone,

        // Receipt number
        receiptNumber: receiptNumber,
      },
    });

    // ------------------------------------------
    // Send order details to frontend
    // ------------------------------------------

    return res.status(201).json({
      success: true,

      message: "Donation order created successfully",

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },

      donation: {
        id: donation.id,
        amount: Number(donation.amount),
        frequency: donation.frequency,
        paymentMethod: donation.paymentMethod,
        status: donation.status,
        receiptNumber: donation.receiptNumber,
      },

      // ----------------------------------------
      // Donor information
      // ----------------------------------------

      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },

      // ----------------------------------------
      // Public Razorpay Key
      // Safe to send to frontend
      // ----------------------------------------

      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Donation Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create donation order",
      error: error.message,
    });
  }
};

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

export const verifyDonationPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationId,
    } = req.body;

    // ------------------------------------------
    // Validate payment information
    // ------------------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !donationId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification data is incomplete",
      });
    }

    // ------------------------------------------
    // Convert donation ID to number
    // ------------------------------------------

    const numericDonationId = Number(donationId);

    if (!Number.isInteger(numericDonationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation ID",
      });
    }

    // ------------------------------------------
    // Find donation
    // ------------------------------------------

    const donation = await prisma.donation.findFirst({
      where: {
        id: numericDonationId,
        userId: req.user.userId,
      },
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // ------------------------------------------
    // Make sure Razorpay order belongs
    // to this donation
    // ------------------------------------------

    if (donation.orderId !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay order",
      });
    }

    // ------------------------------------------
    // If already successful
    // don't process again
    // ------------------------------------------

    if (donation.status === "SUCCESS") {
      return res.status(200).json({
        success: true,

        message: "Donation already verified",

        donation: {
          id: donation.id,

          amount: Number(donation.amount),

          frequency: donation.frequency,

          paymentMethod: donation.paymentMethod,

          status: donation.status,

          transactionId: donation.transactionId,

          paymentId: donation.paymentId,

          orderId: donation.orderId,

          receiptNumber: donation.receiptNumber,

          donatedAt: donation.donatedAt,

          // ------------------------------------
          // IMPORTANT:
          // Return donor information
          // ------------------------------------

          donorName: donation.donorName,

          donorEmail: donation.donorEmail,

          donorPhone: donation.donorPhone,
        },
      });
    }

    // ------------------------------------------
    // Generate expected Razorpay signature
    // ------------------------------------------

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // ------------------------------------------
    // Compare signatures securely
    // ------------------------------------------

    const generatedBuffer = Buffer.from(generatedSignature, "utf8");

    const receivedBuffer = Buffer.from(razorpay_signature, "utf8");

    if (
      generatedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(generatedBuffer, receivedBuffer)
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ------------------------------------------
    // Update donation as SUCCESS
    // ------------------------------------------

    const updatedDonation = await prisma.donation.update({
      where: {
        id: donation.id,
      },

      data: {
        status: "SUCCESS",

        // Razorpay payment ID
        paymentId: razorpay_payment_id,

        // Razorpay order ID
        orderId: razorpay_order_id,

        // Transaction reference
        transactionId: razorpay_payment_id,

        paymentGateway: "RAZORPAY",

        // Successful donation time
        donatedAt: new Date(),
      },
    });

    // ------------------------------------------
    // Send success response
    // ------------------------------------------

    return res.status(200).json({
      success: true,

      message: "Donation successful",

      donation: {
        id: updatedDonation.id,

        amount: Number(updatedDonation.amount),

        frequency: updatedDonation.frequency,

        paymentMethod: updatedDonation.paymentMethod,

        status: updatedDonation.status,

        transactionId: updatedDonation.transactionId,

        paymentId: updatedDonation.paymentId,

        orderId: updatedDonation.orderId,

        receiptNumber: updatedDonation.receiptNumber,

        donatedAt: updatedDonation.donatedAt,

        // --------------------------------------
        // IMPORTANT FOR RECEIPT
        // --------------------------------------

        donorName: updatedDonation.donorName,

        donorEmail: updatedDonation.donorEmail,

        donorPhone: updatedDonation.donorPhone,
      },
    });
  } catch (error) {
    console.error("Verify Donation Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify donation payment",
      error: error.message,
    });
  }
};
// ==========================================
// GET MY DONATION HISTORY
// ==========================================

export const getMyDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: {
        userId: req.user.userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        amount: true,
        frequency: true,
        currency: true,
        paymentMethod: true,
        status: true,
        paymentGateway: true,
        transactionId: true,
        paymentId: true,
        orderId: true,
        receiptNumber: true,
        donatedAt: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      donations: donations.map((donation) => ({
        ...donation,
        amount: Number(donation.amount),
      })),
    });
  } catch (error) {
    console.error("Get My Donations Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load your donation history.",
    });
  }
};
