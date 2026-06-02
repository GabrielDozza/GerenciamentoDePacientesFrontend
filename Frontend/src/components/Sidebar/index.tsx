import "./styles.css";

import { FaUserCircle } from "react-icons/fa";

import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Lume</h2>

      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Dashboard
        </NavLink>

        <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
          Pacientes
        </NavLink>

        <NavLink to="/agenda" className={({ isActive }) => isActive ? "active" : ""}>
          Agenda
        </NavLink>

        <NavLink to="/evolutions" className={({ isActive }) => isActive ? "active" : ""}>
          Evoluções
        </NavLink>
      </nav>

      <div className="profile">
        <FaUserCircle className="user-icon" />
        <p>Usuário</p>
      </div>
    </aside>
  );
} 