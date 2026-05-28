import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function NewEvolution() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/evolutions");
  };

  return (
    <Layout>
      <Header title="Nova Evolução" showSearch={false} />
      <BackButton />

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente</label>
          <input value={patient} onChange={(event) => setPatient(event.target.value)} placeholder="Nome do paciente" />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Descrição da evolução" />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input value={date} onChange={(event) => setDate(event.target.value)} placeholder="25/05/2026" />
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="button-primary">
            Salvar evolução
          </button>
        </div>
      </form>
    </Layout>
  );
}
