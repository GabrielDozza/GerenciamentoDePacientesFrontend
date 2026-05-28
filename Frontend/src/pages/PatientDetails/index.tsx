import { useNavigate, useLocation } from "react-router-dom";

import { Layout } from "../../components/Layout";

import { Header } from "../../components/Header";

import { BackButton } from "../../components/BackButton";

import "./styles.css";

export function PatientDetails() {

  const navigate = useNavigate();

  const location = useLocation();

  const patient = location.state;

  if (!patient) {

    return (

      <Layout>

        <Header
          title="Paciente não encontrado"
          showSearch={false}
        />

        <BackButton />

        <div className="empty-state">

          <h2>Paciente não encontrado</h2>

        </div>

      </Layout>

    );
  }

  return (

    <Layout>

      <Header
        title="Detalhes do Paciente"
        showSearch={false}
      />

      <BackButton />

      <div className="form-container">

        <div className="form-group">

          <label>Nome</label>

          <p>{patient.name}</p>

        </div>

        <div className="form-group">

          <label>Data de nascimento</label>

          <p>{patient.birthDate}</p>

        </div>

        <div className="form-group">

          <label>Telefone</label>

          <p>{patient.phone}</p>

        </div>

        <div className="form-group">

          <label>E-mail</label>

          <p>{patient.email}</p>

        </div>

        <div className="form-group">

          <label>CPF</label>

          <p>{patient.cpf}</p>

        </div>

        <div className="form-group">

          <label>Endereço</label>

          <p>{patient.address}</p>

        </div>

        <div className="form-group">

          <label>Profissão</label>

          <p>{patient.profession}</p>

        </div>

        <div className="form-group">

          <label>Origem do paciente</label>

          <p>{patient.origin}</p>

        </div>

        <section className="patient-events">

          <h2>Eventos</h2>

          {patient.events?.length === 0 ? (

            <p>Nenhum evento encontrado.</p>

          ) : (

            patient.events?.map((event: any) => (

              <div
                className="event-item"
                key={event.id}
              >

                <h3>{event.title}</h3>

                <p>{event.date}</p>

                <p>
                  {event.startTime}
                  {" - "}
                  {event.endTime}
                </p>

              </div>

            ))

          )}

        </section>

        <div className="form-actions">

          <button
            type="button"
            className="button-secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>

          <button
            type="button"
            className="button-primary"
            onClick={() =>
              navigate("/edit-patient", {
                state: patient,
              })
            }
          >
            Editar paciente
          </button>

        </div>

      </div>

    </Layout>

  );
}