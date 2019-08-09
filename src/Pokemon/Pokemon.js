import React from 'react';

import ImageGrid from '../ImageGrid/ImageGrid';
import './Pokemon.css';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.state = {
      pokemonDetails: null
    };
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      .then(res => res.json())
      .then(pokemonDetails => {
        this.setState({
          pokemonDetails: pokemonDetails
        });
      });
  }

  render() {
    if (!this.state.pokemonDetails) {
      return null;
    }
    return (
      <div>
        <a className="linkDiv" href={`/pokemon/${this.props.id}`}>
          <div className="row">
            <div className="col-xs-4 pokemonNameDiv">
              <div>Pokename:</div>
              <div className="pokemonName">{this.props.name}</div>
            </div>
            <div className="col-xs-8">
              <ImageGrid
                img1={this.state.pokemonDetails.sprites.front_default}
                img2={this.state.pokemonDetails.sprites.back_default}
              />
            </div>
          </div>
          <p className="moreInfo">Click for more info</p>
        </a>
        <hr />
      </div>
    );
  }
}

export default Pokemon;
