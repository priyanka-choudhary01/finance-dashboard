import "./SummaryCards.css";

export default function SummaryCards({ transactions = [] }) {

//  {calculating income}
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  //calculating expenses
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = income - expenses;

  return (
    <div className="summary-container">

      <div className="card balance">
        <p>Total Balance</p>
        <h2>₹ {totalBalance.toLocaleString()}</h2>
      </div>

      
      <div className="card income">
        <p>Income</p>
        <h2>₹ {income.toLocaleString()}</h2>
      </div>

      <div className="card expenses">
        <p>Expenses</p>
        <h2>₹ {expenses.toLocaleString()}</h2>
      </div>

    </div>
  );
}