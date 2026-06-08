import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";
import { deletePaciente, getPaciente } from "../../services/patients";
import type { Patient } from "../../services/patients";

export function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPatient = location.state as Patient | undefined;
  const [patient, setPatient] = useState<Patient | null>(initialPatient ?? null);
  const [loading, setLoading] = useState(!initialPatient);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialPatient?.id) {
      return;
    }

    const loadPatient = async () => {
      try {
        const fetched = await getPaciente(initialPatient.id);
        setPatient(fetched);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [initialPatient]);

  if (loading) {
    return (
      <Layout>
        <BackButton />
        <div className="empty-state">
          <h2>Carregando paciente...</h2>
        </div>
      </Layout>
    );
  }

  if (!patient) {
    return (
      <Layout>
        <BackButton />
        <div className="empty-state">
          <h2>Paciente não encontrado</h2>
          {error && <p>{error}</p>}
        </div>
      </Layout>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm(`Excluir paciente "${patient.name}"?`)) {
      return;
    }

    try {
      await deletePaciente(patient.id);
      navigate("/patients");
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
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
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{patient.profession} • {patient.origin}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button-secondary" onClick={() => navigate("/new-event", { state: { patient } })}>+ Novo Evento</button>
          <button className="button-secondary" onClick={() => navigate("/new-evolution", { state: { patient } })}>+ Nova Evolução</button>
          <button className="button-secondary" onClick={() => navigate("/edit-patient", { state: { patient } })}>Editar</button>
          <button className="button-secondary" onClick={handleDelete}>Excluir</button>
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
            {patient.events.map((event) => (
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
        {!patient.evolutions?.length ? (
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Nenhuma evolução registrada.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {patient.evolutions.map((ev) => (
              <div className="event-item" key={ev.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="info-label">Evolução</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--border-light)", padding: "2px 8px", borderRadius: 20 }}>{ev.date}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6 }}>{ev.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
