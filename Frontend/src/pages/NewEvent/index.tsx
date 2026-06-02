import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";

export function NewEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledPatient = location.state?.patient?.name || "";

  const [title, setTitle] = useState("");
  const [patient, setPatient] = useState(prefilledPatient);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/agenda");
  };

  return (
    <Layout>
      <BackButton />
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Novo Evento</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente</label>
          <input value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Nome do paciente" />
        </div>
        <div className="form-group">
          <label>Título / Tipo</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Consulta inicial, Retorno..." />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Início</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Término</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="button-primary">Salvar Evento</button>
        </div>
      </form>
    </Layout>
  );
}
