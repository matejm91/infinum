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
      displayMoves: false,
      isCaugth: false
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

    const myPokemons = localStorage.myPokemons
      .split(',')
      .map(id => parseInt(id));
    if (myPokemons.includes(parseInt(this.id))) {
      this.setState({
        isCaugth: true
      });
    }
  }

  catchThisPokemon = () => {
    const myPokemons = localStorage.myPokemons
      .split(',')
      .map(id => parseInt(id));
    myPokemons.push(this.id);

    localStorage.myPokemons = myPokemons;
    this.showCaughtMessage();
  };

  letGoThisPokemon = () => {
    const myPokemons = localStorage.myPokemons
      .split(',')
      .map(id => parseInt(id));

    myPokemons.splice(myPokemons.indexOf(parseInt(this.id)), 1);

    localStorage.myPokemons = myPokemons;
    this.showLetGoMessage();
  };

  showCaughtMessage = () => {
    this.setState({ isCaugth: true });
    // Usually this would be displayed in a nice popup
    alert('Pokemon caught!');
  };

  showLetGoMessage = () => {
    this.setState({ isCaugth: false });
    // Usually this would be displayed in a nice popup
    alert('You let him go');
  };

  displayAllMoves = () => {
    this.setState({
      displayMoves: !this.state.displayMoves
    });
  };

  render() {
    if (!this.state.pokemon) {
      return null;
    }
    const { pokemon } = this.state;
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
            <p className="pTags__details">Types:</p>
            <hr />
            {pokemon.types.map((type, index) => (
              <p key={index} className="pTags__details detailInformation">
                {type.type.name}
              </p>
            ))}
            <div className="row sizeDiv">
              <p className="pTags__details">Weight:</p>
              <p className="pTags__details detailInformation sizeP">
                {(pokemon.weight * 0.1).toFixed(2)} kg
              </p>
            </div>
            <div className="row sizeDiv">
              <p className="pTags__details">Height:</p>
              <p className="pTags__details detailInformation sizeP">
                {(pokemon.height * 0.1).toFixed(2)}m
              </p>
            </div>
          </div>
          <div className="col-xs-6">
            <p className="pTags__details">Moves:</p>
            <hr />
            <div
              style={{
                display: `${this.state.displayMoves ? 'none' : ''}`
              }}
            >
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
                <p className="showHideMoves" onClick={this.displayAllMoves}>
                  ...and more
                </p>
              ) : (
                ''
              )}
            </div>
            <div
              style={{
                display: `${!this.state.displayMoves ? 'none' : ''}`
              }}
            >
              {pokemon.moves.map((move, index) => (
                <p key={index} className="pTags__details detailInformation">
                  {move.move.name}
                </p>
              ))}
              {pokemon.moves.length > 20 ? (
                <p className="showHideMoves" onClick={this.displayAllMoves}>
                  Collapse moves
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="catchRow"
            style={{
              display: `${this.state.isCaugth ? 'none' : ''}`
            }}
          >
            <button className="catchButton" onClick={this.catchThisPokemon}>
              Catch pokemon
            </button>
          </div>
          <div
            className="catchRow"
            style={{
              display: `${!this.state.isCaugth ? 'none' : ''}`
            }}
          >
            <button className="catchButton" onClick={this.letGoThisPokemon}>
              Let go pokemon
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonDetails;
