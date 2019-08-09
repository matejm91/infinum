import React from 'react';

import Header from '../Header/Header';
import ImageGrid from '../ImageGrid/ImageGrid';
import './PokemonDetails.css';

class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;
    this.state = {
      pokemon: null,
      display: false
    };
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      .then(res => res.json())
      .then(pokemonDetails => {
        pokemonDetails.name =
          pokemonDetails.name[0].toUpperCase() +
          pokemonDetails.name.substring(1);
        this.setState({ pokemon: pokemonDetails });
      });
  }

  catchThisPokemon = () => {
    const myPokemons = localStorage.myPokemons
      .split(',')
      .map(id => parseInt(id));
    console.log('%c⧭', 'color: #00e600', myPokemons);
    myPokemons.push(this.id);

    localStorage.myPokemons = myPokemons;
  };

  displayAllMoves = () => {
    this.setState({
      display: !this.state.display
    });
  };

  render() {
    if (!this.state.pokemon) {
      return null;
    }
    const { pokemon } = this.state;
    console.log('%c⧭', 'color: #997326', pokemon);
    return (
      <div>
        <Header />
        <p className="pokemonName__details">{pokemon.name}</p>
        <ImageGrid
          img1={pokemon.sprites.front_default}
          img2={pokemon.sprites.back_default}
        />
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <p className="pTags__details">Stats:</p>
            <hr />
            {pokemon.stats.map((stat, index) => (
              <p key={index} className="pTags__details detailInformation">
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
            <p className="pTags__details">Abilities:</p>
            <hr />
            {pokemon.abilities.map((ability, index) => (
              <p key={index} className="pTags__details detailInformation">
                {ability.ability.name}
              </p>
            ))}
            <p className="pTags__details">Weight:</p>
            <hr />
            <p className="pTags__details detailInformation">
              {(pokemon.weight * 0.1).toFixed(2)} kg
            </p>
            <p className="pTags__details">Height:</p>
            <hr />
            <p className="pTags__details detailInformation">
              {(pokemon.height * 0.1).toFixed(2)}m
            </p>
            <p className="pTags__details">Types:</p>
            <hr />
            {pokemon.types.map((type, index) => (
              <p key={index} className="pTags__details detailInformation">
                {type.type.name}
              </p>
            ))}
          </div>
          <div className="col-xs-6">
            <p className="pTags__details">Moves:</p>
            <hr />
            <div style={{ display: `${this.state.display ? 'none' : ''}` }}>
              {pokemon.moves.map((move, index) =>
                index < 20 ? (
                  <p key={index} className="pTags__details detailInformation">
                    {move.move.name}
                  </p>
                ) : (
                  ''
                )
              )}
              {pokemon.moves.length > 20 ? (
                <p onClick={this.displayAllMoves}>...and more</p>
              ) : (
                ''
              )}
            </div>
            <div style={{ display: `${!this.state.display ? 'none' : ''}` }}>
              {pokemon.moves.map((move, index) => (
                <p key={index} className="pTags__details detailInformation">
                  {move.move.name}
                </p>
              ))}
              {pokemon.moves.length > 20 ? (
                <p onClick={this.displayAllMoves}>Collapse moves</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <button className="catchButton" onClick={this.catchThisPokemon}>
            Catch this pokemon!
          </button>
        </div>
      </div>
    );
  }
}

export default PokemonDetails;
