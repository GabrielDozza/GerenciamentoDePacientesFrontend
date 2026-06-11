import { deleteApi, getApi, patchApi, postApi } from "./api";

type PatientApi = {
  id: number;
  nome: string;
  dataNascimento: string;
  telefone?: string | null;
  email?: string | null;
  cpf?: string | null;
  endereco?: string | null;
  profissao?: string | null;
  origem?: string | null;
  fotoPerfil?: string | null;
  eventos: EventApi[];
  evolucoes: EvolutionApi[];
};

type EventApi = {
  id: number;
  titulo: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  pacienteId?: number | null;
};

type EvolutionApi = {
  id: number;
  titulo: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  descricao: string;
  pacienteId: number;
};

export type Patient = {
  id: number;
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  cpf: string;
  address: string;
  profession: string;
  origin: string;
  profilePicture?: string;
  events: Event[];
  evolutions: Evolution[];
};

export type Event = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  patientId: number;
  patient: string;
};

export type Evolution = {
  id: number;
  title: string;
  date: string;
  description: string;
  patientId: number;
  patient: string;
};

function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("pt-BR");
}

function normalizeEvent(event: EventApi, patientName: string) {
  return {
    id: event.id,
    title: event.titulo,
    date: formatDate(event.data),
    startTime: event.horarioInicio,
    endTime: event.horarioFim,
    patientId: event.pacienteId ?? 0,
    patient: patientName,
  };
}

function normalizeEvolution(evolution: EvolutionApi, patientName: string) {
  return {
    id: evolution.id,
    title: evolution.titulo,
    date: formatDate(evolution.data),
    description: evolution.descricao,
    patientId: evolution.pacienteId,
    patient: patientName,
  };
}

function normalizePatient(patient: PatientApi) {
  return {
    id: patient.id,
    name: patient.nome,
    birthDate: formatDate(patient.dataNascimento),
    phone: patient.telefone ?? "",
    email: patient.email ?? "",
    cpf: patient.cpf ?? "",
    address: patient.endereco ?? "",
    profession: patient.profissao ?? "",
    origin: patient.origem ?? "",
    profilePicture: patient.fotoPerfil ?? "",
    events: patient.eventos.map((event) => normalizeEvent(event, patient.nome)),
    evolutions: patient.evolucoes.map((evo) => normalizeEvolution(evo, patient.nome)),
  };
}

export async function getPacientes() {
  const result = await getApi<PatientApi[]>("/pacientes");
  return Array.isArray(result) ? result.map(normalizePatient) : [];
}

export async function getPaciente(id: number) {
  const result = await getApi<PatientApi>(`/pacientes/${id}`);
  return normalizePatient(result);
}

export async function createPaciente(payload: {
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  cpf: string;
  address: string;
  profession: string;
  origin: string;
}) {
  const result = await postApi<PatientApi>("/pacientes", {
    nome: payload.name,
    dataNascimento: payload.birthDate,
    telefone: payload.phone,
    email: payload.email,
    cpf: payload.cpf,
    endereco: payload.address,
    profissao: payload.profession,
    origem: payload.origin,
  });

  return normalizePatient(result);
}

export async function updatePaciente(id: number, payload: {
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  cpf: string;
  address: string;
  profession: string;
  origin: string;
}) {
  const result = await patchApi<PatientApi>(`/pacientes/${id}`, {
    nome: payload.name,
    dataNascimento: payload.birthDate,
    telefone: payload.phone,
    email: payload.email,
    cpf: payload.cpf,
    endereco: payload.address,
    profissao: payload.profession,
    origem: payload.origin,
  });

  return normalizePatient(result);
}

export async function deletePaciente(id: number) {
  await deleteApi(`/pacientes/${id}`);
}
