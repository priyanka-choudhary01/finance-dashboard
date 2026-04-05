import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({role,setRole}) {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>Finance Dashboard</h2>
      </div>

      <div className="nav-right">

     {  /* checkbox for dark mode */}
        <div className="dark-mode-container">
          <span>Dark Mode</span>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
          <i className={`fa-solid ${darkMode ? "fa-moon" : "fa-sun"}`}></i>
        </div>

        {/*  Role Dropdown */}
        <div className={`role-dropdown ${open ? "active" : ""}`}>
          <button onClick={() => setOpen(!open)} className="role-btn">
            <i className="fa-solid fa-user"></i> {role}{" "}
            <i className="fa-solid fa-chevron-down"></i>
          </button>

          <div className="role-menu">
            <div onClick={() => { setRole("Admin"); setOpen(false); }}>
              <i className="fa-solid fa-user-shield"></i> Admin
            </div>

            <div onClick={() => { setRole("Viewer"); setOpen(false); }}>
              <i className="fa-solid fa-eye"></i> Viewer
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}