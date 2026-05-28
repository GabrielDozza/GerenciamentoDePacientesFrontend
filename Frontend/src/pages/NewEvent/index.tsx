import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function NewEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/agenda");
  };

  return (
    <Layout>
      <Header title="Novo Evento" showSearch={false} />

      <BackButton />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente</label>
          <input value={patient} onChange={(event) => setPatient(event.target.value)} placeholder="Nome do paciente" />
        </div>
        <div className="form-group">
          <label>Título</label>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Consulta / Retorno" />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input value={date} onChange={(event) => setDate(event.target.value)} placeholder="25/05/2026" />
        </div>
        <div className="form-group">
          <label>Horário de Início</label>
          <input value={startTime} onChange={(event) => setStartTime(event.target.value)} placeholder="09:00" />
        </div>
        <div className="form-group">
          <label>Horário de Término</label>
          <input value={endTime} onChange={(event) => setEndTime(event.target.value)} placeholder="10:00" />
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="button-primary">
            Salvar evento
          </button>
        </div>
      </form>
    </Layout>
  );
}
