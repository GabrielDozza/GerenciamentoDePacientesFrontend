import "./styles.css";

import { Layout } from "../../components/Layout";

import { Header } from "../../components/Header";

export function Evolutions() {

  const evolutions = [
    {
      id: 1,
      patient: "Maria Silva",
      description:
        "Paciente apresentou melhora significativa.",

      date: "25/05/2026",
    },

    {
      id: 2,
      patient: "João Pereira",
      description:
        "Relatou dores musculares.",

      date: "24/05/2026",
    },
  ];

  return (
    <Layout>

      <Header title="Evoluções" />

      <div className="agenda-header">

        <h2>Histórico</h2>

        <button className="new-button">
          + Nova Evolução
        </button>

      </div>

      <div className="events-list">

        {evolutions.map((evolution) => (

          <div
            className="event-card"
            key={evolution.id}
          >

            <h3>{evolution.patient}</h3>

            <p>{evolution.description}</p>

            <span>{evolution.date}</span>

          </div>

        ))}

      </div>

    </Layout>
  );
}