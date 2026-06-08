import { getApi, postApi } from "./api";
import type { Event } from "./patients";

type EventApi = {
  id: number;
  titulo: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  pacienteId?: number | null;
};

function normalizeEvent(event: EventApi, patientName: string): Event {
  return {
    id: event.id,
    title: event.titulo,
    date: new Date(event.data).toLocaleDateString("pt-BR"),
    startTime: event.horarioInicio,
    endTime: event.horarioFim,
    patientId: event.pacienteId ?? 0,
    patient: patientName,
  };
}

export async function getPatientEvents(patientId: number, patientName: string) {
  const result = await getApi<EventApi[]>(`/pacientes/${patientId}/eventos`);
  return Array.isArray(result) ? result.map((event) => normalizeEvent(event, patientName)) : [];
}

export async function createPatientEvent(patientId: number, payload: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  patient: string;
}) {
  const result = await postApi<EventApi>(`/pacientes/${patientId}/eventos`, {
    titulo: payload.title,
    data: payload.date,
    horarioInicio: payload.startTime,
    horarioFim: payload.endTime,
    paciente: payload.patient,
  });
  return normalizeEvent(result, payload.patient);
}
