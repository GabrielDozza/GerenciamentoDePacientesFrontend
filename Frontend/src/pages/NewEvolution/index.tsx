import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";

export function NewEvolution() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledPatient = location.state?.patient?.name || "";

  const [patient, setPatient] = useState(prefilledPatient);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/evolutions");
  };

  return (
    <Layout>
      <BackButton />
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Nova Evolução</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente</label>
          <input value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Nome do paciente" />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Descrição / Prontuário</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva a evolução do paciente, observações clínicas..." rows={6} />
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="button-primary">Salvar Evolução</button>
        </div>
      </form>
    </Layout>
  );
}
