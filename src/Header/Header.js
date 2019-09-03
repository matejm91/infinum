import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <div className="row menuBar">
      <Link to="/" className="linkDiv menuBarItem">
        <div className="col-xs-12">Pokemons</div>
      </Link>
      <Link to="/myPokemons" className="linkDiv menuBarItem">
        <div className="col-xs-12">My pokemons</div>
      </Link>
    </div>
  );
}

export default Header;
