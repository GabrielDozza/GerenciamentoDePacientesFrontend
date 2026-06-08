import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";
import { createPaciente } from "../../services/patients";

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
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await createPaciente({
        name,
        birthDate,
        phone,
        email,
        cpf,
        address,
        profession,
        origin,
      });
      navigate("/patients");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <BackButton />
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Novo Paciente</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        <div className="form-row">
          <div className="form-group">
            <label>Nome completo *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" required />
          </div>
          <div className="form-group">
            <label>Data de nascimento</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>CPF</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(00) 00000-0000" />
          </div>
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" />
        </div>
        <div className="form-group">
          <label>Endereço</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rua, número, bairro..." />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Profissão</label>
            <input value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="Profissão" />
          </div>
          <div className="form-group">
            <label>Origem</label>
            <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Cidade, Estado..." />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="button-primary" disabled={saving}>
            {saving ? "Salvando..." : "Salvar Paciente"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
