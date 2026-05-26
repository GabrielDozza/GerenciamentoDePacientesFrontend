import "./styles.css";

import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function Agenda() {
  const navigate = useNavigate();
  const events = [
    {
      id: 1,
      patient: "Maria Silva",
      title: "Consulta",
      time: "09:00",
    },
    {
      id: 2,
      patient: "João Pereira",
      title: "Retorno",
      time: "11:00",
    },
    {
      id: 3,
      patient: "Ana Costa",
      title: "Avaliação",
      time: "14:00",
    },
  ];

  return (
    <Layout>
      <Header title="Agenda" />
      <BackButton />

      <div className="agenda-header">
        <h2>Próximos Eventos</h2>
        <button className="new-button" onClick={() => navigate("/new-event")}>+ Novo Evento</button>
      </div>

      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.patient}</p>
            <span>{event.time}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}