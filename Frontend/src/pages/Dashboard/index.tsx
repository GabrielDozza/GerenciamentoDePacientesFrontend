import "./styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { getPacientes } from "../../services/patients";
import type { Patient } from "../../services/patients";

export function Dashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getPacientes();
        setPatients(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalPacientes = patients.length;
  const totalEvolucoes = patients.reduce((sum, paciente) => sum + paciente.evolutions.length, 0);
  const todayString = new Date().toLocaleDateString("pt-BR");

  const recentPatients = patients.slice(0, 3).map((patient) => ({
    id: patient.id,
    name: patient.name,
    lastVisit: patient.events.length ? patient.events[0].date : "—",
    status: "Ativo",
  }));

  const todayEvents = patients.flatMap((patient) => patient.events.filter((event) => event.date === todayString).map((event) => ({
    id: event.id,
    patient: patient.name,
    title: event.title,
    time: event.startTime,
  })));

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

        {loading ? (
          <div className="empty-state"><h2>Carregando dados...</h2></div>
        ) : error ? (
          <div className="empty-state"><h2>Erro</h2><p>{error}</p></div>
        ) : (
          <>
            <section className="cards">
              <div className="card">
                <div className="card-icon green">👥</div>
                <h3>Total de Pacientes</h3>
                <div className="card-value">{totalPacientes}</div>
                <p>{Math.max(0, totalPacientes - 1)} novos este mês</p>
              </div>
              <div className="card">
                <div className="card-icon green">📅</div>
                <h3>Consultas Hoje</h3>
                <div className="card-value">{todayEvents.length}</div>
                <p>{todayEvents.length} agendado{todayEvents.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="card">
                <div className="card-icon yellow">📋</div>
                <h3>Evoluções</h3>
                <div className="card-value">{totalEvolucoes}</div>
                <p>Registradas no sistema</p>
              </div>
            </section>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div className="section-card">
                <div className="section-title">Pacientes Recentes</div>
                {recentPatients.length === 0 ? (
                  <p style={{ color: "var(--text-muted)" }}>Nenhum paciente cadastrado.</p>
                ) : recentPatients.map((p) => (
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
                <button className="btn btn-ghost" style={{ marginTop: 8, width: "100%", justifyContent: "center", fontSize: 13 }} onClick={() => navigate("/patients")}>Ver todos os pacientes →</button>
              </div>

              <div className="section-card">
                <div className="section-title">Agenda do Dia</div>
                {todayEvents.length === 0 ? (
                  <p style={{ color: "var(--text-muted)" }}>Nenhum evento marcado para hoje.</p>
                ) : todayEvents.map((e) => (
                  <div key={`${e.id}-${e.time}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                    <div style={{ background: "var(--primary-light)", color: "var(--primary)", borderRadius: 8, padding: "6px 10px", fontWeight: 700, fontSize: 13, minWidth: 54, textAlign: "center" }}>{e.time}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{e.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{e.patient}</div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-ghost" style={{ marginTop: 8, width: "100%", justifyContent: "center", fontSize: 13 }} onClick={() => navigate("/agenda")}>Ver agenda completa →</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
