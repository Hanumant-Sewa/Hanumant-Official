import prisma from "../config/prisma.js";

// ==========================================
// GET TRANSPARENCY INFORMATION
// ==========================================

export const getTransparency = async (req, res) => {
  try {
    // ------------------------------------------
    // 1. Get total successful donations
    // ------------------------------------------

    const donationResult = await prisma.donation.aggregate({
      where: {
        status: "SUCCESS",
      },

      _sum: {
        amount: true,
      },

      _count: {
        id: true,
      },
    });

    const totalDonations = Number(donationResult._sum.amount || 0);

    const successfulDonationCount = donationResult._count.id || 0;

    // ------------------------------------------
    // 2. Get all recorded expenses
    // ------------------------------------------

    const expenses = await prisma.expense.findMany({
      orderBy: {
        expenseDate: "desc",
      },

      include: {
        campaign: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // ------------------------------------------
    // 3. Calculate total expenses
    // ------------------------------------------

    const totalExpenses = expenses.reduce((total, expense) => {
      return total + Number(expense.amount || 0);
    }, 0);

    // ------------------------------------------
    // 4. Calculate remaining funds
    // ------------------------------------------

    const remainingFunds = totalDonations - totalExpenses;

    // ------------------------------------------
    // 5. Group expenses by campaign
    // ------------------------------------------

    const campaignMap = new Map();

    expenses.forEach((expense) => {
      const campaignId = expense.campaignId;

      if (!campaignMap.has(campaignId)) {
        campaignMap.set(campaignId, {
          id: campaignId,
          title: expense.campaign?.title || "Campaign",
          totalExpenses: 0,
          expenses: [],
        });
      }

      const campaign = campaignMap.get(campaignId);

      const expenseAmount = Number(expense.amount || 0);

      campaign.totalExpenses += expenseAmount;

      campaign.expenses.push({
        id: expense.id,
        title: expense.title,
        category: expense.category,
        amount: expenseAmount,
        description: expense.description,
        expenseDate: expense.expenseDate,
        receiptUrl: expense.receiptUrl,
      });
    });

    const campaigns = Array.from(campaignMap.values());

    // ------------------------------------------
    // 6. Return transparency information
    // ------------------------------------------

    return res.status(200).json({
      success: true,

      summary: {
        totalDonations,
        successfulDonationCount,
        totalExpenses,
        remainingFunds,
      },

      campaigns,

      recentExpenses: expenses.slice(0, 10).map((expense) => ({
        id: expense.id,
        title: expense.title,
        category: expense.category,
        amount: Number(expense.amount || 0),
        description: expense.description,
        expenseDate: expense.expenseDate,
        receiptUrl: expense.receiptUrl,

        campaign: expense.campaign
          ? {
              id: expense.campaign.id,
              title: expense.campaign.title,
            }
          : null,
      })),
    });
  } catch (error) {
    console.error("Get Transparency Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load transparency information.",
    });
  }
};
