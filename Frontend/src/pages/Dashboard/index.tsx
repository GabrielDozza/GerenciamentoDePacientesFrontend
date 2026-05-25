import "./styles.css";

export function Dashboard() {
  return (
    <div className="dashboard-container">
        <h1>Dashboard</h1>
      <aside className="sidebar">
        <h2>Lume</h2>

        <nav>
          <button>Dashboard</button>
          <button>Pacientes</button>
          <button>Agenda</button>
          <button>Evoluções</button>
        </nav>

        <div className="profile">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
          />

          <p>Gabriel</p>
        </div>
      </aside>

      <main className="content">

        <header className="header">
          <h1>Dashboard</h1>

          <input
            type="text"
            placeholder="Buscar paciente..."
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