import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="flex justify-between items-center">
        <h1 className="text-left font-bold">PRODUCTITYPRO</h1>
        <Link to="/about" className="text-sm opacity-70">About</Link>
      </div>
    </header>
  );
}

export default Header;