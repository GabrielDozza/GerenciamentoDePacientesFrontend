import "./styles.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { DeleteButton } from "../../components/DeleteButton";

const INITIAL_EVOLUTIONS = [
  { id: 1, patient: "Maria Silva", description: "Paciente apresentou melhora significativa.", date: "25/05/2026" },
  { id: 2, patient: "João Pereira", description: "Relatou dores musculares.", date: "24/05/2026" },
  { id: 3, patient: "Ana Costa", description: "Primeira consulta. Anamnese completa realizada.", date: "22/05/2026" },
];

export function Evolutions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [evolutions, setEvolutions] = useState(INITIAL_EVOLUTIONS);

  const filteredEvolutions = useMemo(
    () => evolutions.filter((evolution) =>
      [evolution.patient, evolution.description, evolution.date]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ),
    [evolutions, searchTerm]
  );

  const handleDelete = (id: number, patient: string) => {
    if (window.confirm(`Excluir evolução de "${patient}"?`)) {
      setEvolutions(evolutions.filter((e) => e.id !== id));
    }
  };

  return (
    <Layout>
      <Header
        title="Evoluções"
        searchValue={searchTerm}
        onSearch={setSearchTerm}
        action={
          <button className="new-button" onClick={() => navigate("/new-evolution")}>+ Nova Evolução</button>
        }
      />

      <div className="agenda-header">
        <h2>{evolutions.length} evolução{evolutions.length !== 1 ? "ções" : ""} registrada{evolutions.length !== 1 ? "s" : ""}</h2>
      </div>

      <div className="events-list">
        {filteredEvolutions.length === 0 ? (
          <div className="empty-state"><h2>Nenhuma evolução encontrada</h2></div>
        ) : (
          filteredEvolutions.map((ev) => (
            <div className="event-card" key={ev.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h3>{ev.patient}</h3>
                <span>{ev.date}</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6 }}>{ev.description}</p>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                <DeleteButton onClick={() => handleDelete(ev.id, ev.patient)} />
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
