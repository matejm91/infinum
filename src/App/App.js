import React from 'react';

import PokemonList from '../PokemonList/PokemonList';
import './App.css';
import Header from '../Header/Header';

class App extends React.Component {
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

        this.setState({ pokemons: pokemonsAltered });
      });
  }

  render() {
    if (!this.state.pokemons) {
      return null;
    }
    return (
      <div className="App">
        <Header />
        <PokemonList pokemons={this.state.pokemons} />
      </div>
    );
  }
}

export default App;
