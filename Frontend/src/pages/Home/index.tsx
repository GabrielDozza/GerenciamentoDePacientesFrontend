import "./styles.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Home() {
     const navigate = useNavigate();
  return (
    <div className="home-container">
      <aside className="sidebar">

        <h2>Lume</h2>

        <nav>
          <button onClick={() => navigate("/")}>
            Dashboard
          </button>
          <button onClick={() => navigate("/patients")}>
            Pacientes
          </button>
          <button onClick={() => navigate("/schedule")}>
            Agenda
          </button>
          <button onClick={() => navigate("/evolutions")}>
            Evoluções
          </button>
        </nav>

        <div className="profile">
          <FaUserCircle className="user-icon" />

          <p>Doutor</p>
        </div>

      </aside>

      <main className="content">

        <header className="header">
          <h1>Dashboard</h1>

          <input
            type="text"
            placeholder="Buscar..."
          />
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