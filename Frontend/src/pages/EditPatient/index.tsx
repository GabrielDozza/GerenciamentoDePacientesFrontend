import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function EditPatient() {
  const navigate = useNavigate();
  const [name, setName] = useState("Maria Silva");
  const [phone, setPhone] = useState("(51) 99999-9999");
  const [email, setEmail] = useState("maria@email.com");
  const [profession, setProfession] = useState("Psicóloga");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/patients");
  };

  return (
    <Layout>
      <Header title="Editar Paciente" />
      <BackButton />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Profissão</label>
          <input value={profession} onChange={(event) => setProfession(event.target.value)} />
        </div>

        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="button-primary">
            Salvar alterações
          </button>
        </div>
      </form>
    </Layout>
  );
}
