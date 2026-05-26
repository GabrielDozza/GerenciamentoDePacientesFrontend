import "./styles.css";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <div className="home-container">
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
          <p>Gabriel</p>
        </div>
      </aside>

      <main className="content">
        <header className="header">
          <h1>Dashboard</h1>
          <input type="text" placeholder="Buscar..." />
        </header>

        <section className="cards">
          <div className="card">
            <h3>Pacientes</h3>
            <p>24 cadastrados</p>
          </div>
          <div className="card">
            <h3>Consultas</h3>
            <p>8 hoje</p>
          </div>
          <div className="card">
            <h3>Evoluções</h3>
            <p>15 registradas</p>
          </div>
        </section>
      </main>
    </div>
  );
} 