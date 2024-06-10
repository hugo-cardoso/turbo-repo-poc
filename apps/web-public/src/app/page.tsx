import { createPokemonApiClient } from "@repo/api-clients/pokemon";

import { PokemonTabs } from "./_components/PokemonTabs";

export default async function Page() {
  const pokemonApiClient = createPokemonApiClient();

  const pokemonNames = ["pikachu", "charmander", "bulbasaur"];
  const pokemons = await Promise.all(
    pokemonNames.map(pokemonApiClient.getPokemonByName),
  );

  return (
    <div className="grid h-dvh w-dvw place-items-center">
      <div className="flex w-[300px] flex-col items-center gap-2">
        <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <PokemonTabs pokemons={pokemons} />
      </div>
    </div>
  );
}
