import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";
import { DeleteButton } from "../../components/DeleteButton";
import "./styles.css";

const MOCK_EVOLUTIONS = [
  { id: 1, patientId: 1, description: "Paciente apresentou melhora significativa.", date: "25/05/2026" },
  { id: 2, patientId: 2, description: "Relatou dores musculares.", date: "24/05/2026" },
  { id: 3, patientId: 1, description: "Reavaliação com estabilidade clínica.", date: "28/05/2026" },
];

export function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state;

  const patientEvolutions = MOCK_EVOLUTIONS.filter((e) => e.patientId === patient?.id);

  if (!patient) {
    return (
      <Layout>
        <BackButton />
        <div className="empty-state"><h2>Paciente não encontrado</h2></div>
      </Layout>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Excluir paciente "${patient.name}"?`)) navigate("/patients");
  };

  const fields = [
    { label: "Nome", value: patient.name },
    { label: "Data de Nascimento", value: patient.birthDate },
    { label: "CPF", value: patient.cpf },
    { label: "Telefone", value: patient.phone },
    { label: "E-mail", value: patient.email },
    { label: "Endereço", value: patient.address },
    { label: "Profissão", value: patient.profession },
    { label: "Origem", value: patient.origin },
  ];

  return (
    <Layout>
      <BackButton />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="patient-avatar" style={{ width: 56, height: 56, fontSize: 22 }}>{patient.name[0]}</div>
          <div>
            <h1 style={{ fontSize: 22 }}>{patient.name}</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{patient.profession} · {patient.origin}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="button-secondary" onClick={() => navigate("/new-event", { state: { patient } })}>+ Novo Evento</button>
          <button className="button-secondary" onClick={() => navigate("/new-evolution", { state: { patient } })}>+ Nova Evolução</button>
          <button className="button-secondary" onClick={() => navigate("/edit-patient", { state: { patient } })}>Editar</button>
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">Informações Pessoais</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
          {fields.map((f) => (
            <div className="info-row" key={f.label}>
              <span className="info-label">{f.label}</span>
              <span className="info-value">{f.value || "—"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div className="section-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: "none" }}>Eventos / Consultas</div>
          <button className="new-patient-btn" style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => navigate("/new-event", { state: { patient } })}>+ Novo Evento</button>
        </div>
        {!patient.events?.length ? (
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Nenhum evento registrado.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {patient.events.map((event: any) => (
              <div className="event-item" key={event.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3>{event.title}</h3>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--border-light)", padding: "2px 8px", borderRadius: 20 }}>{event.date}</span>
                </div>
                <p>{event.startTime} – {event.endTime}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div className="section-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: "none" }}>Histórico de Evoluções</div>
          <button className="new-patient-btn" style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => navigate("/new-evolution", { state: { patient } })}>+ Nova Evolução</button>
        </div>
        {!patientEvolutions.length ? (
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Nenhuma evolução registrada.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {patientEvolutions.map((ev) => (
              <div className="event-item" key={ev.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="info-label">Evolução</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--border-light)", padding: "2px 8px", borderRadius: 20 }}>{ev.date}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text)" }}>{ev.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
