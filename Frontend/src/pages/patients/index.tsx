import "./styles.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { DeleteButton } from "../../components/DeleteButton";

const MOCK_PATIENTS = [
  { id: 1, name: "Maria Silva", birthDate: "15/03/1985", phone: "(51) 99999-9999", email: "maria@email.com", cpf: "111.111.111-11", address: "Rua das Flores, 120", profession: "Psicóloga", origin: "Rio de Janeiro, BR",
    events: [{ id: 1, title: "Consulta inicial", date: "10/06/2026", startTime: "14:00", endTime: "15:00" }] },
  { id: 2, name: "João Pereira", birthDate: "20/07/1980", phone: "(51) 98888-8888", email: "joao@email.com", cpf: "222.222.222-22", address: "Av. Central, 450", profession: "Dentista", origin: "São Paulo, BR",
    events: [{ id: 1, title: "Avaliação", date: "11/06/2026", startTime: "10:00", endTime: "11:00" }] },
  { id: 3, name: "Ana Costa", birthDate: "10/12/1985", phone: "(51) 97777-7777", email: "ana@email.com", cpf: "333.333.333-33", address: "Rua Verde, 89", profession: "Fisioterapeuta", origin: "Porto Alegre, BR", events: [] },
];

export function Patients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(MOCK_PATIENTS);

  const filtered = useMemo(
    () => patients.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [patients, searchTerm]
  );

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Excluir paciente "${name}"? Esta ação não pode ser desfeita.`)) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  return (
    <Layout>
      <header className="patients-header">
        <h1>Pacientes</h1>
        <div className="header-actions">
          <div className="search-wrapper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar paciente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="new-patient-btn" onClick={() => navigate("/new-patient")}>
            + Novo Paciente
          </button>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhum paciente encontrado</h2>
          <p>Tente outro nome ou cadastre um novo paciente.</p>
        </div>
      ) : (
        <section className="patients-grid">
          {filtered.map((patient) => (
            <div className="patient-card" key={patient.id}>
              <div className="patient-card-header">
                <div className="patient-avatar">{patient.name[0]}</div>
                <div>
                  <h3>{patient.name}</h3>
                  <p style={{ fontSize: 12, marginTop: 2 }}>{patient.profession}</p>
                </div>
              </div>

              <p><strong>Nascimento:</strong> {patient.birthDate}</p>
              <p><strong>Telefone:</strong> {patient.phone}</p>
              <p><strong>E-mail:</strong> {patient.email}</p>
              <p><strong>CPF:</strong> {patient.cpf}</p>

              <div className="card-buttons">
                <button onClick={() => navigate("/patient-details", { state: patient })}>
                  Ver detalhes
                </button>
                <button onClick={() => navigate("/edit-patient", { state: { patient } })}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(patient.id, patient.name)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </Layout>
  );
}
