import "./styles.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { DeleteButton } from "../../components/DeleteButton";
import { getPacientes } from "../../services/patients";

type AgendaEvent = {
  id: number;
  patient: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
};

export function Agenda() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const patients = await getPacientes();
        setEvents(
          patients.flatMap((patient) =>
            patient.events.map((event) => ({
              id: event.id,
              patient: patient.name,
              title: event.title,
              date: event.date,
              startTime: event.startTime,
              endTime: event.endTime,
            }))
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

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
      setEvents((current) => current.filter((e) => e.id !== id));
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

      {loading ? (
        <div className="empty-state">
          <h2>Carregando agenda...</h2>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h2>Erro ao carregar agenda</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
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
                <div className="event-card" key={`${event.id}-${event.startTime}`}>
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
        </>
      )}
    </Layout>
  );
}
