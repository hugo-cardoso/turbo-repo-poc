import axios from "axios";
import type { Pokemon } from "./types";

export function createPokemonApiClient() {
  const httpClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
  });

  return {
    async getPokemonByName(name: string): Promise<Pokemon> {
      const { data } = await httpClient.get<Pokemon>(`/pokemon/${name}`);
      return {
        id: data.id,
        name: data.name,
        sprites: {
          front_default: data.sprites.front_default,
        },
        types: data.types,
      };
    },
  };
}
