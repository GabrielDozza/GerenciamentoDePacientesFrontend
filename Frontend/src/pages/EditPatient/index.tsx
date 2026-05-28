import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function EditPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;

  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (patient) {
      setBirthDate(patient.birthDate || "");
      setName(patient.name || "");
      setPhone(patient.phone || "");
      setEmail(patient.email || "");
      setCpf(patient.cpf || "");
      setAddress(patient.address || "");
      setProfession(patient.profession || "");
      setOrigin(patient.origin || "");
    }
  }, [patient]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/patients");
  };

  return (
    <Layout>
      <Header title="Editar Paciente" />
      <BackButton />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Data de nascimento</label>
          <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)}
          />
        </div>

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
          <label>CPF</label>
          <input value={cpf} onChange={(event) => setCpf(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Endereço</label>
          <input value={address} onChange={(event) => setAddress(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Profissão</label>
          <input value={profession} onChange={(event) => setProfession(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Origem</label>
          <input value={origin} onChange={(event) => setOrigin(event.target.value)} />
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
