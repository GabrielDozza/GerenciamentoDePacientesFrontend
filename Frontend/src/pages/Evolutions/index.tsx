import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function Evolutions() {
  const navigate = useNavigate();
  const [evolutions, setEvolutions] = useState([
    {
      id: 1,
      patient: "Maria Silva",
      description: "Paciente apresentou melhora significativa.",
      date: "25/05/2026",
    },
    {
      id: 2,
      patient: "João Pereira",
      description: "Relatou dores musculares.",
      date: "24/05/2026",
    },
  ]);

  const handleDeleteEvolution = (evolutionId: number, patientName: string) => {
    if (window.confirm(`Tem certeza que deseja deletar a evolução de ${patientName}? Esta ação não pode ser desfeita.`)) {
      setEvolutions(evolutions.filter(e => e.id !== evolutionId));
    }
  };

  return (
    <Layout>
      <Header title="Evoluções" />
      <BackButton />
      <div className="agenda-header">
        <h2>Histórico</h2>
        <button className="new-button" onClick={() => navigate("/new-evolution")}>+ Nova Evolução</button>
      </div>

      <div className="events-list">
        {evolutions.length === 0 ? (
        <div className="empty-state">
        <h2>Nenhuma evolução encontrada</h2>
      </div>
      ) : (
          evolutions.map((evolution) => (
          <div className="event-card" key={evolution.id}>
            <h3>{evolution.patient}</h3>
            <p>{evolution.description}</p>
            <span>{evolution.date}</span>            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
              <button
                className="button-danger"
                onClick={() => handleDeleteEvolution(evolution.id, evolution.patient)}
                style={{
                  backgroundColor: "#e74c3c",
                  borderColor: "#c0392b",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Deletar
              </button>
            </div>          </div>
        )))}
      </div>
    </Layout>
  );
}