import { getApi } from "./api";

export type Professional = {
  id: number;
  nome: string;
  email: string;
  especialidade: string;
  fotoPerfil?: string;
};

export async function getProfessional(id: number) {
  return getApi<Professional>(`/profissionais/${id}`);
}