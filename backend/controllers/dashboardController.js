const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const [totalIncomeAgg, totalExpenseAgg] = await Promise.all([
      Income.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const totalIncomeSum = totalIncomeAgg[0]?.total || 0;
    const totalExpenseSum = totalExpenseAgg[0]?.total || 0;

    const since30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const since60Days = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const [last30DaysExpenses, last60DaysIncome, recentIncome, recentExpenses] =
      await Promise.all([
        Expense.find({ userId, date: { $gte: since30Days } }).sort({ date: -1 }),
        Income.find({ userId, date: { $gte: since60Days } }).sort({ date: -1 }),
        Income.find({ userId }).sort({ date: -1 }).limit(5),
        Expense.find({ userId }).sort({ date: -1 }).limit(5),
      ]);

    const expensesLast30Days = last30DaysExpenses.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const incomeLast60Days = last60DaysIncome.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const recentTransactions = [
      ...recentIncome.map((t) => ({ ...t.toObject(), type: "income" })),
      ...recentExpenses.map((t) => ({ ...t.toObject(), type: "expense" })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      totalBalance: totalIncomeSum - totalExpenseSum,
      totalIncome: totalIncomeSum,
      totalExpenses: totalExpenseSum,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenses,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncome,
      },
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
