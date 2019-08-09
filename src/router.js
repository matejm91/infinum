import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App/App';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import MyPokemons from './MyPokemons/MyPokemons';

export default (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/pokemon/:id" exact component={PokemonDetails} />
    <Route path="/myPokemons" exact component={MyPokemons} />
  </Switch>
);
