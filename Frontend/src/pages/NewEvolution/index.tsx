import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";
import { createPatientEvolution } from "../../services/evolutions";
import type { Patient } from "../../services/patients";

export function NewEvolution() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient as Patient | undefined;
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!patient?.id) {
      setError("Selecione um paciente válido antes de criar uma evolução.");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      await createPatientEvolution(patient.id, {
        title: `Evolução ${patient.name}`,
        date,
        startTime: date,
        endTime: date,
        description,
        patient: patient.name,
      });
      navigate("/patient-details", { state: patient });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <BackButton />
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Nova Evolução</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <label>Paciente</label>
          <input value={patient?.name ?? ""} readOnly placeholder="Selecione um paciente" />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descrição / Prontuário</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva a evolução do paciente, observações clínicas..." rows={6} required />
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="button-primary" disabled={saving || !patient?.id}>
            {saving ? "Salvando..." : "Salvar Evolução"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
