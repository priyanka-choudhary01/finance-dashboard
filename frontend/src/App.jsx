import { useState ,useEffect} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import Transactions from "./pages/Transactions";
import { transactions as initialData } from "./data/mockData";
import Insights from "./pages/InsightPage";

function App() {
 const [transactions, setTransactions] = useState(() => {
  const saved = localStorage.getItem("transactions");
  return saved ? JSON.parse(saved) : initialData;
});
  const [role, setRole] = useState("admin");
useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);
  return (
    <>
      <Navbar role={role} setRole={setRole}/>

      <DashboardPage transactions={transactions} />

      <Transactions
        transactions={transactions}
        setTransactions={setTransactions}
        role={role}  
      />
      <Insights transactions={transactions} role={role} />
    </>
  );
}

export default App;