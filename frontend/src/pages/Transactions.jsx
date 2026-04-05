import { useState } from "react";
import "./Transactions.css";
import { categories, types } from "../data/mockData";

export default function Transactions({ transactions, setTransactions, role }) {

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const [filters, setFilters] = useState({
    category: "All",
    type: "All",
    search: "",
    dateRange: "3m",
  });

  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  const filtered = transactions.filter((t) => {
    const tDate = new Date(t.date);
    const now = new Date();

    let dateMatch = true;

    if (filters.dateRange === "1m") {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      dateMatch = tDate >= d;
    } else if (filters.dateRange === "2m") {
      const d = new Date();
      d.setMonth(d.getMonth() - 2);
      dateMatch = tDate >= d;
    } else if (filters.dateRange === "3m") {
      const d = new Date();
      d.setMonth(d.getMonth() - 3);
      dateMatch = tDate >= d;
    } else if (filters.dateRange === "thisYear") {
      dateMatch = tDate.getFullYear() === now.getFullYear();
    } else if (filters.dateRange === "lastYear") {
      dateMatch = tDate.getFullYear() === now.getFullYear() - 1;
    }

    return (
      (filters.category === "All" || t.category === filters.category) &&
      (filters.type === "All" || t.type === filters.type) &&
      t.category.toLowerCase().includes(filters.search.toLowerCase()) &&
      dateMatch
    );
  });

  
  const handleExportCSV = () => {
    const headers = ["Date", "Category", "Amount", "Type"];

    const rows = filtered.map((t) => [
      t.date,
      t.category,
      t.amount,
      t.type,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleSubmit = () => {
    if (role !== "admin") return;

    if (!form.date || !form.category || Number(form.amount) <= 0) return;

    if (editId !== null) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editId
            ? { ...t, ...form, amount: Number(form.amount) }
            : t
        )
      );
    } else {
      const newTransaction = {
        id: Date.now(),
        ...form,
        amount: Number(form.amount),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }

    setForm({ date: "", category: "", amount: "", type: "expense" });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (t) => {
    if (role !== "admin") return;
    setForm(t);
    setEditId(t.id);
    setShowForm(true);
  };

 
  const handleDelete = (id) => {
    if (role !== "admin") return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const closeModal = () => {
    setShowForm(false);
    setEditId(null);
  };

  return (
    <div className="transactions">

   
      <div className="filter-bar">
        <span>Filter:</span>

        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          {categories.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          {types.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>

        <select onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}>
          <option value="3m">Last 3 Months</option>
          <option value="1m">Last 1 Month</option>
          <option value="2m">Last 2 Months</option>
          <option value="thisYear">This Year</option>
          <option value="lastYear">Last Year</option>
        </select>

        <select onChange={(e) => setVisibleCount(Number(e.target.value))}>
          <option value={5}>Show 5</option>
          <option value={10}>Show 10</option>
          <option value={20}>Show 20</option>
        </select>

        <input
          placeholder="Keyword Search"
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

       
        {role === "admin" && (
          <button
            className="add-btn"
            onClick={() => {
              setForm({ date: "", category: "", amount: "", type: "expense" });
              setEditId(null);
              setShowForm(true);
            }}
          >
            + Add Transaction
          </button>
        )}
      </div>

     
      {role === "viewer" && (
        <div className="viewer-warning">
          You are viewing as a viewer. You cannot add, edit or delete transactions.
        </div>
      )}

    
      <div className="table-card">
        <div className="table-header">
          <span>Transactions</span>
          <button className="export-btn" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>

         <tbody>
  {filtered.length === 0 ? (
    <tr>
      <td colSpan="5">No transactions found</td>
    </tr>
  ) : (
    filtered.slice(0, visibleCount).map((t) => (
      <tr key={t.id}>
        <td>{t.date}</td>
        <td>{t.category}</td>
        <td>₹{t.amount.toLocaleString()}</td>
        <td>{t.type}</td>

        {role === "admin" ? (
          <td className="actions">
            <button onClick={() => handleEdit(t)}>Edit</button>
            <button onClick={() => handleDelete(t.id)}>🗑</button>
          </td>
        ) : (
          <td className="actions">
            <button disabled>Edit</button>
            <button disabled>🗑</button>
          </td>
        )}
      </tr>
    ))
  )}
</tbody>
        </table>

        <p className="show-info">
          Showing {Math.min(visibleCount, filtered.length)} of{" "}
          {filtered.length} transactions
        </p>
      </div>

    
      {showForm && editId === null && (
        <div className="modal">
          <div className="modal-content modern-modal">

            <div className="modal-header">
              <h3>Add Transaction</h3>
              <button onClick={closeModal}>✕</button>
            </div>

            <div className="form-grid">
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />

              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select Category</option>
                {categories.slice(1).map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <input type="number" placeholder="Enter Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />

              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="primary-btn" onClick={handleSubmit}>Add Transaction</button>
              <button onClick={closeModal}>Cancel</button>
            </div>

          </div>
        </div>
      )}

      
      {showForm && editId !== null && (
        <div className="modal">
          <div className="modal-content modern-modal edit-modal">

            <div className="modal-header">
              <h3>Edit Transaction</h3>
              <button onClick={closeModal}>✕</button>
            </div>

            <div className="form-grid">
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />

              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.slice(1).map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />

              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <p className="edit-info">Editing existing transaction</p>

            <div className="modal-actions">
              <button className="update-btn" onClick={handleSubmit}>Update</button>
              <button onClick={closeModal}>Cancel</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}