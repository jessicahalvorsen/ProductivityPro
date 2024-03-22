import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import {useAuthContext} from '../hooks/useAuthContext'


function Header() {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      {user && (
        <div>
          <span>{user.email}</span>
          <button onClick={handleClick}>Logout</button>
          <Link to="/">
            <h1 className="text-left font-bold">PRODUCTITYPRO</h1>
          </Link>
        </div>
      )}
      {!user && (
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-left font-bold">PRODUCTITYPRO</h1>
          </Link>
          <Link to="/login" className="text-sm opacity-70">Login</Link>
          <Link to="/signup" className="text-sm opacity-70">Signup</Link>
          <Link to="/about" className="text-sm opacity-70">About</Link>
        </div>
      )}
    </header>
  );
}

export default Header;