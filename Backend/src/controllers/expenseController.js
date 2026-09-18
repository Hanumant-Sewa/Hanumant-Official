import prisma from "../config/prisma.js";

// GET all expenses
export const getAllExpenses = async (req, res) => {
  try {
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

    return res.status(200).json({
      expenses,
    });
  } catch (error) {
    console.error("Get Expenses Error:", error);

    return res.status(500).json({
      message: "Failed to fetch expenses.",
    });
  }
};

// CREATE expense
export const createExpense = async (req, res) => {
  try {
    const {
      campaignId,
      title,
      category,
      amount,
      description,
      expenseDate,
      receiptUrl,
    } = req.body;

    if (!campaignId || !title || !category || !amount || !expenseDate) {
      return res.status(400).json({
        message:
          "Campaign, title, category, amount and expense date are required.",
      });
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: Number(campaignId),
      },
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found.",
      });
    }

    const expense = await prisma.expense.create({
      data: {
        campaignId: Number(campaignId),
        title,
        category,
        amount,
        description: description || null,
        expenseDate: new Date(expenseDate),
        receiptUrl: receiptUrl || null,
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

    return res.status(201).json({
      message: "Expense created successfully.",
      expense,
    });
  } catch (error) {
    console.error("Create Expense Error:", error);

    return res.status(500).json({
      message: "Failed to create expense.",
    });
  }
};
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      campaignId,
      title,
      category,
      amount,
      description,
      expenseDate,
      receiptUrl,
    } = req.body;

    const existingExpense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!existingExpense) {
      return res.status(404).json({
        message: "Expense not found.",
      });
    }

    const expense = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...(campaignId !== undefined && {
          campaignId: Number(campaignId),
        }),

        ...(title !== undefined && {
          title,
        }),

        ...(category !== undefined && {
          category,
        }),

        ...(amount !== undefined && {
          amount,
        }),

        ...(description !== undefined && {
          description: description || null,
        }),

        ...(expenseDate !== undefined && {
          expenseDate: new Date(expenseDate),
        }),

        ...(receiptUrl !== undefined && {
          receiptUrl: receiptUrl || null,
        }),
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

    return res.status(200).json({
      message: "Expense updated successfully.",
      expense,
    });
  } catch (error) {
    console.error("Update Expense Error:", error);

    return res.status(500).json({
      message: "Failed to update expense.",
    });
  }
};
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const existingExpense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!existingExpense) {
      return res.status(404).json({
        message: "Expense not found.",
      });
    }

    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Expense Error:", error);

    return res.status(500).json({
      message: "Failed to delete expense.",
    });
  }
};
