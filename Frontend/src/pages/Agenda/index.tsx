import "./styles.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { DeleteButton } from "../../components/DeleteButton";

const INITIAL_EVENTS = [
  { id: 1, patient: "Maria Silva", title: "Consulta inicial", date: "10/06/2026", startTime: "14:00", endTime: "15:00" },
  { id: 2, patient: "João Pereira", title: "Retorno", date: "11/06/2026", startTime: "10:00", endTime: "11:00" },
];

export function Agenda() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const filteredEvents = useMemo(
    () => events.filter((event) =>
      [event.title, event.patient, event.date]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ),
    [events, searchTerm]
  );

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`Excluir evento "${title}"?`)) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  return (
    <Layout>
      <Header
        title="Agenda"
        searchValue={searchTerm}
        onSearch={setSearchTerm}
        action={
          <button className="new-button" onClick={() => navigate("/new-event")}>+ Novo Evento</button>
        }
      />

      <div className="agenda-header">
        <h2>{events.length} evento{events.length !== 1 ? "s" : ""} agendado{events.length !== 1 ? "s" : ""}</h2>
      </div>

      <div className="events-list">
        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <h2>Nenhum evento encontrado</h2>
            <p>Tente outro termo ou cadastre um novo evento.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <h3>{event.title}</h3>
                <span>{event.date}</span>
              </div>
              <p><strong>Paciente:</strong> {event.patient}</p>
              <p><strong>Horário:</strong> {event.startTime} – {event.endTime}</p>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                <DeleteButton onClick={() => handleDelete(event.id, event.title)} />
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
