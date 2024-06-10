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
          className="!p-3 relative flex flex-col items-center gap-2"
          key={pokemon.id}
          value={pokemon.name}
        >
          <code className="absolute top-3 right-3 text-neutral-400 text-sm">
            #{pokemon.id}
          </code>
          <div className="mx-auto flex aspect-square w-1/2">
            <img
              className="h-full w-full object-none"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
          <p>{capitalize(pokemon.name)}</p>
          <p className="text-neutral-400 text-sm">
            {pokemon.types.map((type) => type.type.name).join(" / ")}
          </p>
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
