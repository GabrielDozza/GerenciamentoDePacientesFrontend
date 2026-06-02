import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";

export function Dashboard() {
  const navigate = useNavigate();

  const recentPatients = [
    { id: 1, name: "Maria Silva", lastVisit: "10/06/2026", status: "Ativo" },
    { id: 2, name: "João Pereira", lastVisit: "11/06/2026", status: "Ativo" },
    { id: 3, name: "Ana Costa", lastVisit: "08/06/2026", status: "Ativo" },
  ];

  const todayEvents = [
    { id: 1, patient: "Maria Silva", title: "Consulta inicial", time: "14:00" },
    { id: 2, patient: "João Pereira", title: "Retorno", time: "16:00" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <header className="header">
          <h1>Dashboard</h1>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
          </span>
        </header>

        <section className="cards">
          <div className="card">
            <div className="card-icon green">👥</div>
            <h3>Total de Pacientes</h3>
            <div className="card-value">24</div>
            <p>3 novos este mês</p>
          </div>
          <div className="card">
            <div className="card-icon green">📅</div>
            <h3>Consultas Hoje</h3>
            <div className="card-value">8</div>
            <p>2 a confirmar</p>
          </div>
          <div className="card">
            <div className="card-icon yellow">📋</div>
            <h3>Evoluções</h3>
            <div className="card-value">15</div>
            <p>Esta semana</p>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div className="section-card">
            <div className="section-title">Pacientes Recentes</div>
            {recentPatients.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="profile-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{p.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.lastVisit}</div>
                  </div>
                </div>
                <span style={{ fontSize: 11, background: "var(--success-bg)", color: "var(--success)", padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>{p.status}</span>
              </div>
            ))}
            <button className="btn btn-ghost" style={{ marginTop: 8, width: "100%", justifyContent: "center", fontSize: 13 }} onClick={() => navigate("/patients")}>
              Ver todos os pacientes →
            </button>
          </div>

          <div className="section-card">
            <div className="section-title">Agenda do Dia</div>
            {todayEvents.map((e) => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                <div style={{ background: "var(--primary-light)", color: "var(--primary)", borderRadius: 8, padding: "6px 10px", fontWeight: 700, fontSize: 13, minWidth: 54, textAlign: "center" }}>{e.time}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{e.patient}</div>
                </div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{ marginTop: 8, width: "100%", justifyContent: "center", fontSize: 13 }} onClick={() => navigate("/agenda")}>
              Ver agenda completa →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
