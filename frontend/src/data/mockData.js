
export const summaryData = {
  totalBalance: 89500,
  income: 162000,
  expenses: 72500,
};

export const transactions = [
  // JANUARY
  { id: 1, date: "2026-01-01", category: "Salary", amount: 40000, type: "income" },
  { id: 2, date: "2026-01-03", category: "Rent", amount: 10000, type: "expense" },
  { id: 3, date: "2026-01-10", category: "Food", amount: 2500, type: "expense" },
  { id: 4, date: "2026-01-15", category: "Shopping", amount: 4000, type: "expense" },

  // FEBRUARY
  { id: 5, date: "2026-02-01", category: "Salary", amount: 40000, type: "income" },
  { id: 6, date: "2026-02-05", category: "Rent", amount: 10000, type: "expense" },
  { id: 7, date: "2026-02-12", category: "Food", amount: 3000, type: "expense" },
  { id: 8, date: "2026-02-20", category: "Freelance", amount: 8000, type: "income" },

  // MARCH
  { id: 9, date: "2026-03-01", category: "Salary", amount: 40000, type: "income" },
  { id: 10, date: "2026-03-04", category: "Rent", amount: 10000, type: "expense" },
  { id: 11, date: "2026-03-10", category: "Shopping", amount: 5000, type: "expense" },
  { id: 12, date: "2026-03-18", category: "Food", amount: 2800, type: "expense" },

  // APRIL
  { id: 13, date: "2026-04-01", category: "Salary", amount: 42000, type: "income" },
  { id: 14, date: "2026-04-03", category: "Food", amount: 3000, type: "expense" },
  { id: 15, date: "2026-04-04", category: "Shopping", amount: 5000, type: "expense" },
  { id: 16, date: "2026-04-04", category: "Rent", amount: 10000, type: "expense" },
];

// =======================
// BALANCE TREND (LINE CHART)
// =======================
export const balanceTrend = [
  { month: "Jan", balance: 25000 },
  { month: "Feb", balance: 37000 },
  { month: "Mar", balance: 30000 },
  { month: "Apr", balance: 45000 },
];

// =======================
// SPENDING BREAKDOWN (PIE CHART)
// =======================
export const spendingBreakdown = [
  { name: "Rent", value: 40000 },
  { name: "Food", value: 11300 },
  { name: "Shopping", value: 14000 },
  { name: "Other", value: 7200 },
];

// =======================
// INSIGHTS DATA
// =======================
export const insightsData = {
  topCategory: {
    name: "Rent",
    amount: 30000,
  },

  monthlyComparison: {
    April: 10500,
    March: 20500,
  },

  tips: [
    "You spent less on shopping this month compared to last month.",
    "Rent remains your highest expense.",
    "Food expenses are consistent across months.",
  ],
};

// =======================
// FILTER OPTIONS
// =======================
export const categories = ["All", "Salary", "Rent", "Food", "Shopping", "Freelance"];
export const types = ["All", "income", "expense"];