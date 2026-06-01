import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function NewPatient() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [origin, setOrigin] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/patients");
  };

  return (
    <Layout>
      <Header title="Novo Paciente" showSearch={false} />
      <BackButton />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome completo"
          />
        </div>
        <div className="form-group">
           <label>Data de nascimento</label>   
           <input
            type="date"
            value={birthDate}
            onChange={(event) =>setBirthDate(event.target.value)}
        />
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email@exemplo.com"
          />
        </div>

        <div className="form-group">
          <label>CPF</label>
          <input
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            placeholder="000.000.000-00"
          />
        </div>
        
        <div className="form-group">
            <label>Endereço</label>
            <input
            value={address}
            onChange={(event) =>
            setAddress(event.target.value)}
             placeholder="Rua, número..."
            />
        </div>
        
        <div className="form-group">
            <label>Profissão</label>    
            <input
            value={profession}
            onChange={(event) =>
            setProfession(event.target.value)}
            placeholder="Profissão"
            />
        </div>

        <div className="form-group">
            <label>Origem do paciente</label>
            <input
            value={origin}
            onChange={(event) =>
            setOrigin(event.target.value)}
            placeholder="aonde nasceu..."
            />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="button-secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
          <button type="submit" className="button-primary">
            Salvar paciente
          </button>
        </div>
      </form>
    </Layout>
  );
}