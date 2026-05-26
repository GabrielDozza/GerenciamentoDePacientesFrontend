import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function NewEvent() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/agenda");
  };

  return (
    <Layout>
      <Header title="Novo Evento" />
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
          <label>Horário</label>
          <input value={time} onChange={(event) => setTime(event.target.value)} placeholder="09:00" />
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
