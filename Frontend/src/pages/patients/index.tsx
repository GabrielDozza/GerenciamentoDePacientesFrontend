import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useMemo, useState } from "react";
import { BackButton } from "../../components/BackButton";

export function Patients() {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
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
];

  const filteredPatients = useMemo(
    () =>
      patients.filter((patient) =>
        patient.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),

    [patients, searchTerm],
  );

  return (
    <div className="patients-container">

      <aside className="sidebar">

        <h2>Lume</h2>

        <nav>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/patients"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Pacientes
          </NavLink>

          <NavLink
            to="/agenda"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Agenda
          </NavLink>

          <NavLink
            to="/evolutions"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Evoluções
          </NavLink>

        </nav>

        <div className="profile">

          <FaUserCircle className="user-icon" />

          <p>Gabriel</p>

        </div>

      </aside>

      <main className="content">

        <header className="patients-header">

          <BackButton/>

          <h1>Pacientes</h1>

          <div className="header-actions">

            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <button
              className="new-patient-btn"
              onClick={() => navigate("/new-patient")}
            >
              + Novo Paciente
            </button>

          </div>

        </header>

        <section className="patients-grid">

  {filteredPatients.length === 0 ? (

    <div className="empty-state">

      <h2>Nenhum paciente encontrado</h2>

      <p>
        Cadastre um novo paciente para começar.
      </p>

    </div>

  ) : (

    filteredPatients.map((patient) => (

            <div
              className="patient-card"
              key={patient.id}
            >

              <FaUserCircle className="patient-icon" />

              <h3>{patient.name}</h3>

              <p>
                <strong>Nascimento:</strong>{" "}
                {patient.birthDate}
              </p>

              <p>
                <strong>Telefone:</strong>{" "}
                {patient.phone}
              </p>

              <p>
                <strong>E-mail:</strong>{" "}
                {patient.email}
              </p>

              <p>
                <strong>CPF:</strong>{" "}
                {patient.cpf}
              </p>

              <p>
                <strong>Endereço:</strong>{" "}
                {patient.address}
              </p>

              <p>
                <strong>Profissão:</strong>{" "}
                {patient.profession}
              </p>

              <p>
                <strong>Origem:</strong>{" "}
                {patient.origin}
              </p>

              <div className="card-buttons">

              <button
              onClick={() =>
              navigate("/patient-details", {
              state: patient,
              })
              }
              >
              Ver detalhes
              </button>

                <button
                  onClick={() =>
                    navigate("/edit-patient", { state: { patient } })
                  }
                >
                  Editar
                </button>

                <button className="delete-button">
                  Excluir
                </button>

              </div>

            </div>

          )))}

        </section>

      </main>

    </div>
  );
}