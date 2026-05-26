import "./styles.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export function Patients() {
  const navigate = useNavigate();
  const patients = [
    {
      id: 1,
      name: "Maria Silva",
      phone: "(51) 99999-9999",
      email: "maria@email.com",
      profession: "Psicóloga",
    },

    {
      id: 2,
      name: "João Pereira",
      phone: "(51) 98888-8888",
      email: "joao@email.com",
      profession: "Dentista",
    },

    {
      id: 3,
      name: "Ana Costa",
      phone: "(51) 97777-7777",
      email: "ana@email.com",
      profession: "Fisioterapeuta",
    },
  ];

  return (
    <div className="patients-container">

      <aside className="sidebar">

        <h2>Lume</h2>

        <nav>
          <button onClick={() => navigate("/")}>
             Dashboard
            </button>
          <button className="active">
            Pacientes
          </button>

          <button onClick={() => navigate("/schedule")}>
            Agenda
          </button>

          <button onClick={() => navigate("/evolutions")}>
            Evoluções
          </button>
        </nav>

        <div className="profile">
          <FaUserCircle className="user-icon" />

          <p>Gabriel</p>
        </div>

      </aside>

      <main className="content">

        <header className="patients-header">
            <button
            className="back-button"
        onClick={() => navigate(-1)}>
                x 
            </button>
          <h1>Pacientes</h1>

          <div className="header-actions">

            <input
              type="text"
              placeholder="Buscar paciente..."
            />

            <button className="new-patient-btn" onClick={() => navigate("/new-patient")}>
              + Novo Paciente
            </button>

          </div>

        </header>

        <section className="patients-grid">

          {patients.map((patient) => (

            <div className="patient-card" key={patient.id}>

              <FaUserCircle className="patient-icon" />

              <h3>{patient.name}</h3>

              <p>{patient.phone}</p>

              <p>{patient.email}</p>

              <span>{patient.profession}</span>

              <div className="card-buttons">

                <button onClick={() => navigate("/patient-details")}>
                  Ver detalhes
                </button>

                <button onClick={() => navigate("/edit-patient")}>
                  Editar
                </button>

              </div>

            </div>
          ))}

        </section>

      </main>

    </div>
  );
}