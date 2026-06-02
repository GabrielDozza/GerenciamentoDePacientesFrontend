import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";
import { DeleteButton } from "../../components/DeleteButton";

export function Agenda() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    {
      id: 1,
      patient: "Maria Silva",
      title: "Consulta inicial",
      date: "10/06/2026",
      startTime: "14:00",
      endTime: "15:00",
    },

    {
      id: 2,
      patient: "João Pereira",
      title: "Retorno",
      date: "11/06/2026",
      startTime: "10:00",
      endTime: "11:00",
    },
  ]);

  const handleDeleteEvent = (eventId: number, eventTitle: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o evento "${eventTitle}"? Esta ação não pode ser desfeita.`)) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  return (
    <Layout>
      <Header title="Agenda" />
      <BackButton />

      <div className="agenda-header">
        <h2>Próximos Eventos</h2>
        <button className="new-button" onClick={() => navigate("/new-event")}>+ Novo Evento</button>
      </div>

      <div className="events-list">
        {events.length === 0 ? (
        <div className="empty-state">
        <h2>Nenhum evento cadastrado</h2>
        <p>Cadastre um novo evento para começar.</p>
      </div>
      ) : (
           events.map((event) => (

            <div
              className="event-card"
              key={event.id}
            >

              <h3>{event.title}</h3>

              <p>
                <strong>Paciente:</strong>
                {" "}
                {event.patient}
              </p>

              <p>
                <strong>Data:</strong>
                {" "}
                {event.date}
              </p>

              <p>
                <strong>Início:</strong>
                {" "}
                {event.startTime}
              </p>

              <p>
                <strong>Término:</strong>
                {" "}
                {event.endTime}
              </p>

              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                <DeleteButton onClick={() => handleDeleteEvent(event.id, event.title)} />
              </div>

            </div>

          ))

        )}

      </div>

    </Layout>
  );
}