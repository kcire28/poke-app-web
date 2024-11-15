import api from "@/api/axiosConfig";
import { handleResponse } from "@/utils/api-helper";

export class TrainerService {
  constructor() { }

  async verify({
    email
  }) {
    return handleResponse(api.post('/trainers/verify', { email }));
  }

  async create({
    email,
    name
  }) {
    return handleResponse(api.post('/trainers', { email, name }));
  }

  async addPokemon({
    trainerId,
    pokemonId
  }) {
    return handleResponse(api.post('/trainers/add-favorites', {
      trainerId,
      pokemonId
    }));
  }

  async removePokemon({
    trainerId,
    externalId
  }) {
    return handleResponse(api.delete(`/trainers/${trainerId}/favorites`, {
      data: {
        externalId
      }
    }));
  }
}