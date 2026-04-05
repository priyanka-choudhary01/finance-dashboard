import Charts from "../components/Charts";
import SummaryCards from "../components/SummaryCards";

function DashboardPage({ transactions }) {
  return (
    <>
      <SummaryCards transactions={transactions} />
      <Charts transactions={transactions} />
    </>
  );
}

export default DashboardPage;