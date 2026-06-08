import { getApi, postApi } from "./api";

type EvolutionApi = {
  id: number;
  titulo: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  descricao: string;
  pacienteId: number;
};

export type Evolution = {
  id: number;
  title: string;
  date: string;
  description: string;
  patientId: number;
  patient: string;
};

function normalizeEvolution(evolution: EvolutionApi, patientName: string): Evolution {
  return {
    id: evolution.id,
    title: evolution.titulo,
    date: new Date(evolution.data).toLocaleDateString("pt-BR"),
    description: evolution.descricao,
    patientId: evolution.pacienteId,
    patient: patientName,
  };
}

export async function getPatientEvolutions(patientId: number, patientName: string) {
  const result = await getApi<EvolutionApi[]>(`/pacientes/${patientId}/evolucoes`);
  return Array.isArray(result) ? result.map((evo) => normalizeEvolution(evo, patientName)) : [];
}

export async function createPatientEvolution(patientId: number, payload: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  patient: string;
}) {
  const result = await postApi<EvolutionApi>(`/pacientes/${patientId}/evolucoes`, {
    titulo: payload.title,
    data: payload.date,
    horarioInicio: payload.startTime,
    horarioFim: payload.endTime,
    descricao: payload.description,
    paciente: payload.patient,
  });
  return normalizeEvolution(result, payload.patient);
}
