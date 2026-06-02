import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";
import { DeleteButton } from "../../components/DeleteButton";
import "./styles.css";

export function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state;
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Maria Silva",
      birthDate: "15/03/1985",
      phone: "(51) 99999-9999",
      email: "maria@email.com",
      cpf: "111.111.111-11",
      address: "Rua das Flores, 120",
      profession: "Psicóloga",
      origin: "Rio de Janeiro, BR",
      events: [
        {
          id: 1,
          title: "Consulta inicial",
          date: "10/06/2026",
          startTime: "14:00",
          endTime: "15:00",
        },
      ],
    },
    {
      id: 2,
      name: "João Pereira",
      birthDate: "20/07/1980",
      phone: "(51) 98888-8888",
      email: "joao@email.com",
      cpf: "222.222.222-22",
      address: "Av. Central, 450",
      profession: "Dentista",
      origin: "São Paulo, BR",
      events: [
        {
          id: 1,
          title: "Avaliação",
          date: "11/06/2026",
          startTime: "10:00",
          endTime: "11:00",
        },
      ],
    },
    {
      id: 3,
      name: "Ana Costa",
      birthDate: "10/12/1985",
      phone: "(51) 97777-7777",
      email: "ana@email.com",
      cpf: "333.333.333-33",
      address: "Rua Verde, 89",
      profession: "Fisioterapeuta",
      origin: "Porto Alegre, BR",
      events: [],
    },
  ]);

  const handleDeletePatient = () => {
    if (window.confirm(`Tem certeza que deseja deletar o paciente ${patient?.name}? Esta ação não pode ser desfeita.`)) {
      setPatients(patients.filter(p => p.id !== patient?.id));
      navigate("/patients");
    }
  };

  const evolutions = [
    {
      id: 1,
      patientId: 1,
      description: "Paciente apresentou melhora significativa.",
      date: "25/05/2026",
    },
    {
      id: 2,
      patientId: 2,
      description: "Relatou dores musculares.",
      date: "24/05/2026",
    },
    {
      id: 3,
      patientId: 1,
      description: "Reavaliação com estabilidade clínica.",
      date: "28/05/2026",
    },
  ];

  const patientEvolutions = evolutions.filter(
    (evolution) => evolution.patientId === patient?.id,
  );

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

        <div className="form-actions" style={{ marginTop: "2rem", justifyContent: "center" }}>
          <button type="button" className="button-secondary" onClick={() => navigate(`/edit-patient`, { state: patient })}>
            Editar
          </button>
          <DeleteButton onClick={handleDeletePatient} />
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

        <section className="patient-evolutions">
          <h2>Evoluções do paciente</h2>

          {patientEvolutions.length === 0 ? (
            <p>Nenhuma evolução encontrada para este paciente.</p>
          ) : (
            patientEvolutions.map((evolution) => (
              <div className="event-item" key={evolution.id}>
                <p>{evolution.date}</p>
                <p>{evolution.description}</p>
              </div>
            ))
          )}
        </section>

        <div className="form-actions" style={{ justifyContent: "center" }}>
          <button
            type="button"
            className="button-secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
        </div>

      </div>

    </Layout>

  );
}