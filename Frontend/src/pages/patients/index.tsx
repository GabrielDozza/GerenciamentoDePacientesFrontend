import "./styles.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { getPacientes, deletePaciente } from "../../services/patients";
import type { Patient } from "../../services/patients";

export function Patients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await getPacientes();
        setPatients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const filtered = useMemo(
    () => patients.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [patients, searchTerm]
  );

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Excluir paciente "${name}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      await deletePaciente(id);
      setPatients((current) => current.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <Layout>
      <Header
        title="Pacientes"
        searchValue={searchTerm}
        onSearch={setSearchTerm}
        action={
          <button className="new-patient-btn" onClick={() => navigate("/new-patient") }>
            + Novo Paciente
          </button>
        }
      />

      {loading ? (
        <div className="empty-state">
          <h2>Carregando pacientes...</h2>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h2>Erro ao buscar pacientes</h2>
          <p>{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhum paciente encontrado</h2>
          <p>Tente outro nome ou cadastre um novo paciente.</p>
        </div>
      ) : (
        <section className="patients-grid">
          {filtered.map((patient) => (
            <div
              className="patient-card"
              key={patient.id}
              onClick={() => navigate("/patient-details", {
              state: { patient }
              })}
              style={{ cursor: "pointer" }}
            >
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
                <button
                  onClick={(e) => {
                  e.stopPropagation();
                  navigate("/patient-details", { state: { patient } });
                  }}
                >
                  Ver detalhes
                </button>

                <button
                  onClick={(e) => {
                  e.stopPropagation();
                  navigate("/edit-patient", { state: { patient } });
                  }}
                >
                  Editar
                </button>

                <button
                  className="delete-button"
                    onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(patient.id, patient.name);
                    }}
                >
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
