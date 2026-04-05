import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./Charts.css";
export default function Charts({ transactions }) {
  const monthlyMap = {};

  const COLORS = ["#4CAF50", "#FF6384", "#36A2EB", "#FFCE56"];
if (!transactions || transactions.length === 0) {
    console.log(transactions);
  return <p>No data available</p>;
}
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = 0;
    }

    monthlyMap[month] += t.type === "income" ? t.amount : -t.amount;
  });

  const balanceTrend = Object.keys(monthlyMap)
  .sort((a, b) => new Date(`1 ${a} 2023`) - new Date(`1 ${b} 2023`))
  .map((month) => ({
    month,
    balance: monthlyMap[month],
  }));

  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }
      categoryMap[t.category] += t.amount;
    }
  });

  const spendingBreakdown = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat],
  }));


  return (
    <div className="charts-container">

     
      <div className="chart-card">
        <h3>Balance Over Time</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceTrend}>
            <CartesianGrid />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="balance"
              className="line-chart"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>


      <div className="chart-card">
        <h3>Spending Breakdown</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={spendingBreakdown}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
            >
              {spendingBreakdown.map((_, index) => (
               <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}