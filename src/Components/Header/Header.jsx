import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ isLoggedIn, username, logout }) {
  return (
    <header className="headerMedico">
      <div className="logoHeader">
        <img className="imgHeader" src="../src/Img/logoHeader.png" alt="Logo" />
      </div>

      <nav className="navbar">
        <div className="nav-medico">
          <Link to='/home' className='links'>Home</Link>
          <Link to='/prontuario' className='links'>Prontuário</Link>
        </div>

      </nav>
    </header>
  );
}
