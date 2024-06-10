import axios from "axios";
import { PokemonSchema, type Pokemon } from "./types";

export function createPokemonApiClient() {
  const httpClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
  });

  return {
    async getPokemonByName(name: string): Promise<Pokemon> {
      const response = await httpClient.get<Pokemon>(`/pokemon/${name}`);
      const data = PokemonSchema.parse(response.data);

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
