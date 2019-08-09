import React from 'react';

import Pokemon from '../Pokemon/Pokemon';

function PokemonList(props) {
  return (
    <div>
      {props.pokemons.map(pokemon => (
        <Pokemon
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          url={pokemon.url}
        />
      ))}
    </div>
  );
}

export default PokemonList;
