import React from 'react';

import Header from '../Header/Header';
import PokemonList from '../PokemonList/PokemonList';
import './MyPokemons.css';

class MyPokemons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: null
    };
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.json())
      .then(pokemons => {
        const pokemonsAltered = pokemons.results.map((pokemon, index) => {
          pokemon.name =
            pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

          pokemon.id = index + 1;
          return pokemon;
        });

        let pokemonsFiltered;
        if (localStorage.myPokemons !== undefined) {
          const myPokemons = localStorage.myPokemons
            .split(',')
            .map(id => parseInt(id));
          pokemonsFiltered = pokemonsAltered.filter(pokemon =>
            myPokemons.includes(pokemon.id)
          );
        } else {
          pokemonsFiltered = [];
          localStorage.setItem('myPokemons', '');
        }

        this.setState({ pokemons: pokemonsFiltered });
      });
  }

  render() {
    if (!this.state.pokemons) {
      return null;
    }

    if (this.state.pokemons.length === 0) {
      return (
        <div>
          <Header />
          <p className="noPokemons">You haven't caught any pokemons jet...</p>
          <p className="noPokemons">Go on, they won't catch themselves</p>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <PokemonList pokemons={this.state.pokemons} />
      </div>
    );
  }
}

export default MyPokemons;
