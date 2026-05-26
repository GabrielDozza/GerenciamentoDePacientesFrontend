import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
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
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
             Dashboard
            </NavLink>
          <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
            Pacientes
          </NavLink>
          <NavLink to="/agenda" className={({ isActive }) => isActive ? "active" : ""}>
            Agenda
          </NavLink>
          <NavLink to="/evolutions" className={({ isActive }) => isActive ? "active" : ""}>
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