import {
  createPokemonApiClient,
  type Pokemon,
} from "@repo/api-clients/pokemon";
import { useQueries } from "@tanstack/react-query";

import { PokemonTabs } from "./components/PokemonTabs";

function App() {
  const pokemonApiClient = createPokemonApiClient();

  const pokemonNames = ["pikachu", "charmander", "bulbasaur"];
  const pokemonsQuery = useQueries({
    queries: pokemonNames.map((name) => ({
      queryKey: ["pokemon", name],
      queryFn: () => pokemonApiClient.getPokemonByName(name),
    })),
  });

  const isSuccess = pokemonsQuery.every((query) => query.isSuccess);
  const pokemons = pokemonsQuery.map((query) => query.data) as Pokemon[];

  return (
    <div className="w-dvw h-dvh grid place-items-center">
      <div className="flex flex-col gap-2 w-[300px] items-center">
        <h1>{import.meta.env.VITE_APP_NAME}</h1>
        {isSuccess && <PokemonTabs pokemons={pokemons} />}
      </div>
    </div>
  );
}

export default App;
