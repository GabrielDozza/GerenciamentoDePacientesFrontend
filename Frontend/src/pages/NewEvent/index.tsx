import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { BackButton } from "../../components/BackButton";
import { createPatientEvent } from "../../services/events";
import type { Patient } from "../../services/patients";

export function NewEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient as Patient | undefined;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!patient?.id) {
      setError("Selecione um paciente válido antes de criar um evento.");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      await createPatientEvent(patient.id, {
        title,
        date,
        startTime,
        endTime,
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
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>Novo Evento</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <label>Paciente</label>
          <input value={patient?.name ?? ""} readOnly placeholder="Selecione um paciente" />
        </div>
        <div className="form-group">
          <label>Título / Tipo</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Consulta inicial, Retorno..." required />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Início</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Término</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="button-primary" disabled={saving || !patient?.id}>
            {saving ? "Salvando..." : "Salvar Evento"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
