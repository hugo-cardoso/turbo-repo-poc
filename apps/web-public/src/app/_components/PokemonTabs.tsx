"use client";

import type { Pokemon } from "@repo/api-clients/pokemon";
import { Tabs } from "@repo/ui/tabs";

type PokemonTabsProps = {
  pokemons: Pokemon[];
};

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);

export function PokemonTabs(props: PokemonTabsProps) {
  const names = props.pokemons.map((pokemon) => pokemon.name);

  if (!props.pokemons.length) return null;

  return (
    <Tabs title="Pokemons" defaultValue={props.pokemons[0].name}>
      <Tabs.List>
        {names.map((name) => (
          <Tabs.Trigger key={name} value={name}>
            {name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {props.pokemons.map((pokemon) => (
        <Tabs.Content
          className="!p-3 relative flex flex-col gap-2 items-center"
          key={pokemon.id}
          value={pokemon.name}
        >
          <code className="absolute right-3 top-3 text-neutral-400 text-sm">
            #{pokemon.id}
          </code>
          <div className="w-1/2 aspect-square flex mx-auto">
            <img
              className="w-full h-full object-none"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
          <p>{capitalize(pokemon.name)}</p>
          <p className="text-sm text-neutral-400">
            {pokemon.types.map((type) => type.type.name).join(" / ")}
          </p>
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
