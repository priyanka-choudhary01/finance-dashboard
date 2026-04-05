import { useMemo } from "react";
import "./InsightPage.css";

export default function Insights({ transactions, role }) {
  const categoryTotals = useMemo(() => {
    const map = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    return map;
  }, [transactions]);
  const topCategory = useMemo(() => {
    let max = 0;
    let name = "";

    for (let cat in categoryTotals) {
      if (categoryTotals[cat] > max) {
        max = categoryTotals[cat];
        name = cat;
      }
    }

    return { name, amount: max };
  }, [categoryTotals]);
  const monthlyData = useMemo(() => {
    const map = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!map[month]) {
        map[month] = { income: 0, expense: 0 };
      }

      map[month][t.type] += t.amount;
    });

    return map;
  }, [transactions]);

  const months = Object.keys(monthlyData).slice(-2); 
  const handleExportCSV = () => {
    const headers = ["Category", "Amount"];

    const rows = Object.entries(categoryTotals);

    let csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "insights.csv";
    link.click();
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(categoryTotals, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "insights.json";
    a.click();
  };
 if (!transactions || transactions.length === 0) {
  return <p>No insights available</p>;
}
  return (
    <div className="insights">

      <div className="insights-header">
        <h3>Insights</h3>
      {role === "admin" && (
  <div className="insight-actions">
    <button onClick={handleExportCSV}>Export CSV</button>
    <button onClick={handleExportJSON}>Download JSON</button>
  </div>
)}
      </div>
      <div className="top-card">
        <h4>Top Spending Category</h4>
        <h2>₹ {topCategory.amount}</h2>
        <p>{topCategory.name}</p>
      </div>


      <div className="month-compare">

        {months.map((m, i) => (
          <div key={i} className="month-card">
            <h4>{m}</h4>

            <p>Income: ₹ {monthlyData[m].income}</p>
            <p>Expense: ₹ {monthlyData[m].expense}</p>
          </div>
        ))}

      </div>

      <div className="category-list">
        {Object.entries(categoryTotals).map(([cat, amt], i) => (
          <div key={i} className="category-item">
            <span>{cat}</span>
            <span>₹ {amt}</span>
          </div>
        ))}
      </div>

      {role === "viewer" && (
        <p className="viewer-note">
          🔒 Only admins can perform export actions.
        </p>
      )}

    </div>
  );
}