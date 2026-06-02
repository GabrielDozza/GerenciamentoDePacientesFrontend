import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";

export function EditPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient ?? location.state;

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (patient) {
      setName(patient.name || "");
      setBirthDate(patient.birthDate || "");
      setPhone(patient.phone || "");
      setEmail(patient.email || "");
      setCpf(patient.cpf || "");
      setAddress(patient.address || "");
      setProfession(patient.profession || "");
      setOrigin(patient.origin || "");
    }
  }, [patient]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/patients");
  };

  return (
    <Layout>
      <BackButton />
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Editar Paciente</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nome completo</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Data de nascimento</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>CPF</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Endereço</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Profissão</label>
            <input value={profession} onChange={(e) => setProfession(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Origem</label>
            <input value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="button-primary">Salvar Alterações</button>
        </div>
      </form>
    </Layout>
  );
}
