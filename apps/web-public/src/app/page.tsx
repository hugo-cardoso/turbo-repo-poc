import { createPokemonApiClient } from "@repo/api-clients/pokemon";

import { PokemonTabs } from "./_components/PokemonTabs";

export default async function Page() {
  const pokemonApiClient = createPokemonApiClient();

  const pokemonNames = ["pikachu", "charmander", "bulbasaur"];
  const pokemons = await Promise.all(
    pokemonNames.map(pokemonApiClient.getPokemonByName),
  );

  return (
    <div className="w-dvw h-dvh grid place-items-center">
      <div className="flex flex-col gap-2 w-[300px] items-center">
        <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <PokemonTabs pokemons={pokemons} />
      </div>
    </div>
  );
}
