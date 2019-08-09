import React from 'react';

import './Header.css';

function Header() {
  return (
    <div className="row menuBar">
      <a href="/" className="linkDiv menuBarItem">
        <div className="col-xs-12">Pokemons</div>
      </a>
      <a href="/myPokemons" className="linkDiv menuBarItem">
        <div className="col-xs-12">My pokemons</div>
      </a>
    </div>
  );
}

export default Header;
