import api from "@/api/axiosConfig";
import { handleResponse } from "@/utils/api-helper";

export class PokemonsService {
  constructor() { }

  async getPokemons({
    page = 1,
    limit,
  }) {
    return handleResponse(api.get('/pokemons', { params: { page, limit } }));
  }

  async getTrainerPokemons({
    trainerId,
    page,
    limit
  }) {
    return handleResponse(api.get(`/trainers/${trainerId}/favorites`, { params: { page, limit } }));
  }

  async getNonFavoritePoekemons({
    trainerId,
    page, limit
  }) {
    return handleResponse(api.get(`/pokemons/exclude/${trainerId}`, { params: { page, limit } }));
  }

  async getPokemonDetails(externalId) {
    return handleResponse(api.get(`/pokemons/external/${externalId}`));
  }

  async syncPokemons() {
    return handleResponse(api.get('/pokemons/sync'));
  }
}