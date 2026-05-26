import "./styles.css";

import { Layout } from "../../components/Layout";

import { Header } from "../../components/Header";

export function Agenda() {
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

      <div className="agenda-header">

        <h2>Próximos Eventos</h2>

        <button className="new-button">
          + Novo Evento
        </button>

      </div>

      <div className="events-list">

        {events.map((event) => (

          <div
            className="event-card"
            key={event.id}
          >

            <h3>{event.title}</h3>

            <p>{event.patient}</p>

            <span>{event.time}</span>

          </div>

        ))}

      </div>

    </Layout>
  );
}